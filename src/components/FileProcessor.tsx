import { useEffect, useState } from "react";
import { useBuckets, useFiles, useProcessFile } from "../hooks/fileQueries";
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

  const { data: buckets, isLoading: bucketsLoading } = useBuckets();
  const { data: filesByBucket, isLoading: filesLoading } =
    useFiles(selectedBucket);

  const { mutate: processFile, isPending: isProcessFilePending } =
    useProcessFile();

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
      filesToProcess.forEach(async (file: string) => {
        processFile({ bucket: selectedBucket, file });
      });
    }
  };

  return (
    <div className=" flex flex-col items-start  ">
      <h2 className="text-red-500 uppercase  -mb-[2px] ml-[6px] ">
        Process Files
      </h2>

      <div className=" p-4  border rounded-xl border-red-500 flex justify-end items-center gap-10 relative">
        <SingleListBox
          label="Bucket"
          options={buckets}
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
        <button
          onClick={() => setModalOpen(true)}
          className=" absolute top-0 right-0"
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
