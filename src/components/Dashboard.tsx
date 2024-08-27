import React from "react";
import { ProcessedFileInfo } from "../hooks/fileQueries";

const Dashboard: React.FC = () => {
  const filesData = Object.keys(localStorage).map((key) =>
    JSON.parse(localStorage.getItem(key) || "{}")
  );

  return (
    <div className="text-gray-800">
      <h2 className="text-xl mb-4 text-zinc-900 text-sm font-normal flex flex-col items-start">
        Processed Files{" "}
      </h2>
      <ul>
        {filesData.map((file: ProcessedFileInfo, index) => (
          <li
            key={index}
            className="border-b py-2 flex flex-col items-start font-semibold"
          >
            <div className="">
              <span className="text-sm font-normal">Bucket Name: </span>
              {file.bucketName}
            </div>
            <div>
              <span className="text-sm font-normal">File Name: </span>{" "}
              {file.fileName}
            </div>
            <div className="break-all ">
              <span className="text-sm font-normal">Hash: </span>{" "}
              <span className="text-[12px]">{file.fileContentHash}</span>
            </div>
            <div>
              <span className="text-sm font-normal">Timestamp: </span>{" "}
              {file.processingTimestamp}
            </div>
            <div>
              <span className="text-sm font-normal">Classification: </span>{" "}
              {file.classification}
            </div>
            <div>
              <span className="text-sm font-normal">File Size: </span>{" "}
              {file.fileSize}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
