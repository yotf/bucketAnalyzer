import { useEffect, useState } from "react";
import Button from "./atoms/Button";
import Input from "./atoms/Input";
import { z } from "zod";
import {
  useBuckets,
  useCreateBucket,
  useCreateFile,
} from "../hooks/fileQueries";
import SingleListBox from "./atoms/SingleListBox";

type BucketAndFileCreatorProps = {
  // Define the props for the component here
};

const bucketNameSchema = z
  .string()
  .min(3, {
    message: "Bucket names must be at least 3 characters long.",
  })
  .max(63, {
    message: "Bucket names must be at most 63 characters long.",
  })
  .regex(/^[a-z0-9.-]+$/, {
    message:
      "Bucket names can only contain lowercase letters, numbers, periods, and hyphens.",
  })
  .refine(
    (name) => {
      const isIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(name);
      return !isIP;
    },
    {
      message: "Bucket names cannot be formatted as IP addresses.",
    }
  )
  .refine(
    (name) => {
      return /^[a-z0-9]/.test(name) && /[a-z0-9]$/.test(name);
    },
    {
      message: "Bucket names must start and end with a letter or number.",
    }
  );

const fileNameSchema = z
  .string()
  .min(1, {
    message: "File names must be at least 1 character long.",
  })
  .max(1024, {
    message: "File names must be at most 1024 characters long.",
  })
  .regex(/^[a-zA-Z0-9._-]+$/, {
    message:
      "File names can only contain letters, numbers, periods, hyphens, and underscores.",
  });

const fileContentSchema = z.string().max(1024 * 1024 * 10, {
  message: "File content must be less than 10MB.",
});

const BucketAndFileCreator: React.FC<BucketAndFileCreatorProps> = () => {
  const [bucketName, setBucketName] = useState("");
  const [bucketError, setBucketError] = useState<string | undefined>(undefined);

  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState<string | undefined>(undefined);

  const [fileContent, setFileContent] = useState("");
  const [fileContentError, setFileContentError] = useState<string | undefined>(
    undefined
  );

  const [selectedBucket, setSelectedBucket] = useState<string>("");

  const { data: buckets, isLoading: bucketsLoading } = useBuckets();

  const { mutate: createBucket, isPending: createBucketPending } =
    useCreateBucket();
  const { mutate: createFile, isPending: createFilePending } = useCreateFile();

  useEffect(() => {
    if (buckets && buckets.length > 0) {
      setSelectedBucket(buckets[0]);
    }
  }, [buckets]);

  const validateBucketName = (name: string) => {
    const result = bucketNameSchema.safeParse(name);
    setBucketError(
      result.success
        ? undefined
        : result.error.errors[0]?.message || "Invalid bucket name"
    );
  };

  const validateFileName = (name: string) => {
    const result = fileNameSchema.safeParse(name);
    setFileError(
      result.success
        ? undefined
        : result.error.errors[0]?.message || "Invalid file name"
    );
  };
  const validateFileContent = (content: string) => {
    const result = fileContentSchema.safeParse(content);
    setFileContentError(
      result.success
        ? undefined
        : result.error.errors[0]?.message || "Invalid file content"
    );
  };

  const onBucketSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createBucket({ bucketName });
  };

  const onFileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createFile({ bucketName: selectedBucket, fileName, content: fileContent });
  };

  return (
    <div className="flex border-red-500 border rounded-xl p-10 gap-5">
      <div className="flex flex-col gap-4">
        <h2 className="text-red-500 uppercase  ">Create Bucket</h2>
        {/* BUCKET CREATION FORM */}
        <form
          className="flex flex-col  justify-between flex-1"
          onSubmit={onBucketSubmit}
        >
          <Input
            value={bucketName}
            placeholder="Name"
            onChange={(event) => {
              setBucketName(event.target.value);
              validateBucketName(event.target.value);
            }}
            error={bucketError}
          />
          <Button
            className=""
            type="submit"
            disabled={!!bucketError || bucketName === "" || createBucketPending}
          >
            {" "}
            Add
          </Button>
        </form>
      </div>
      {/* FILE CREATION FORM */}

      <form className="flex flex-col flex-1 gap-4" onSubmit={onFileSubmit}>
        <h2 className="text-red-500 uppercase   ">Create File</h2>

        <SingleListBox
          // label="Bucket"
          options={buckets}
          selected={selectedBucket}
          onChange={(bucket) => {
            setSelectedBucket(bucket);
          }}
        />

        <Input
          value={fileName}
          placeholder="Name"
          onChange={(event) => {
            setFileName(event.target.value);
            validateFileName(event.target.value);
          }}
          error={fileError}
        />
        <Input
          value={fileContent}
          placeholder="Content"
          onChange={(event) => {
            setFileContent(event.target.value);
            validateFileContent(event.target.value);
          }}
          error={fileContentError}
        />
        <Button
          className=""
          type="submit"
          disabled={
            !!fileContentError ||
            !!fileError ||
            fileName === "" ||
            fileContent === "" ||
            createFilePending
          }
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default BucketAndFileCreator;
