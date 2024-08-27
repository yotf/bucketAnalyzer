import { useEffect, useState } from "react";
import MultiListBox from "./atoms/MultiListBox";
import SingleListBox from "./atoms/SingleListBox";
import Button from "./atoms/Button";
import CryptoJS from "crypto-js";
import { fetchFile, useBuckets, useFiles } from "../hooks/fileQueries";
import Modal from "./atoms/Modal";
import Dashboard from "./Dashboard";

type FileProcessorProps = {};

const FileProcessor: React.FC<FileProcessorProps> = () => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedBucket, setSelectedBucket] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);

  const { data: buckets, isLoading: bucketsLoading } = useBuckets();
  const { data: filesByBucket, isLoading: filesLoading } =
    useFiles(selectedBucket);

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
        const response = await fetchFile(selectedBucket, file);
        console.log(response);
        const content = response.content;
        const hash = CryptoJS.SHA256(content).toString();

        const classification = content.includes("virus")
          ? "Malware"
          : "Goodware";

        const processingInfo = {
          bucketName: selectedBucket,
          fileName: file,
          fileContentHash: hash,
          processingTimestamp: new Date().toISOString(),
          classification: classification,
          fileSize: content.length,
          fileType: "text/plain",
        };
        localStorage.setItem(
          `processedFile-${selectedBucket}-${file}`,
          JSON.stringify(processingInfo)
        );
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
