import { useEffect, useState } from "react";
import MultiListBox from "./atoms/MultiListBox";
import SingleListBox from "./atoms/SingleListBox";
import Button from "./atoms/Button";
import { useBuckets, useFiles } from "../hooks/fileQueries";

type FileProcessorProps = {
  onProcessFiles: (bucket: string, files: string[]) => void;
};

const FileProcessor: React.FC<FileProcessorProps> = ({ onProcessFiles }) => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedBucket, setSelectedBucket] = useState<string>("");

  const { data: buckets, isLoading: bucketsLoading } = useBuckets();

  useEffect(() => {
    if (buckets && buckets.length > 0) {
      setSelectedBucket(buckets[0]);
      console.log(buckets);
    }
  }, [buckets]);

  const { data: filesByBucket, isLoading: filesLoading } =
    useFiles(selectedBucket);

  const handleProcessFiles = () => {
    if (selectedBucket) {
      onProcessFiles(selectedBucket, selectedFiles);
    }
  };

  return (
    <div className=" flex flex-col items-start  ">
      <h2 className="text-red-500 uppercase  -mb-[2px] ml-[6px] ">
        Process Files
      </h2>

      <div className=" p-4  border rounded-xl border-red-500 flex justify-end items-center gap-10 ">
        <SingleListBox
          label="Bucket"
          options={buckets}
          loading={bucketsLoading}
          selected={selectedBucket}
          onChange={(bucket) => {
            setSelectedBucket(bucket);
            setSelectedFiles([]); // Clear files when a new bucket is selected
          }}
        />

        <MultiListBox
          label="Files"
          options={selectedBucket ? filesByBucket : []}
          selected={selectedFiles}
          onChange={setSelectedFiles}
        />

        <Button
          onClick={handleProcessFiles}
          disabled={!selectedBucket}
          className="mt-[23px]"
        >
          Process Selected Files
        </Button>
      </div>
    </div>
  );
};

export default FileProcessor;
