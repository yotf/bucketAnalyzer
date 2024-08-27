import { useEffect, useState } from "react";
import { useBuckets, useFiles, useProcessFiles } from "../hooks/fileQueries";
import Button from "./atoms/Button";
import Modal from "./atoms/Modal";
import MultiListBox from "./atoms/MultiListBox";
import SingleListBox from "./atoms/SingleListBox";
import Dashboard from "./Dashboard";

type FileProcessorProps = {};

const FileProcessor: React.FC<FileProcessorProps> = () => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedBucket, setSelectedBucket] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);

  const { data: buckets } = useBuckets();
  const { data: filesByBucket } = useFiles(selectedBucket);

  const { mutate: processFiles, isPending: isProcessFilePending } =
    useProcessFiles();

  useEffect(() => {
    if (buckets && buckets.length > 0) {
      setSelectedBucket(buckets[0]);
    }
  }, [buckets]);

  const handleProcessFiles = () => {
    if (selectedBucket) {
      const filesToProcess =
        selectedFiles.length === 0 ? filesByBucket : selectedFiles; // process all files if none are selected
      console.log("Processing files:", filesToProcess);
      processFiles({ bucket: selectedBucket, files: filesToProcess });
    }
  };

  return (
    <div className=" flex flex-col items-start   ">
      <h2 className="text-red-500 uppercase  -mb-[2px] ml-[6px] ">
        Process Files
      </h2>

      <div className=" p-10  border rounded-xl border-red-500 flex flex-col justify-end items-center  relative w-[477px]">
        <div className="flex gap-10 w-full ">
          <SingleListBox
            label="Bucket"
            options={buckets}
            selected={selectedBucket}
            onChange={(bucket) => {
              setSelectedBucket(bucket);
              setSelectedFiles([]);
            }}
          />

          <MultiListBox
            label="Files"
            options={selectedBucket ? filesByBucket : []}
            selected={selectedFiles}
            onChange={setSelectedFiles}
          />
        </div>

        <Button
          onClick={handleProcessFiles}
          disabled={!selectedBucket || isProcessFilePending}
          className="mt-[23px] w-full"
        >
          Process Selected Files
        </Button>
        <button
          onClick={() => setModalOpen(true)}
          className=" absolute top-4 right-10 text-blue-500 text-[10px] font-medium uppercase "
        >
          Open Dashboard
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <Dashboard />
      </Modal>
    </div>
  );
};

export default FileProcessor;
