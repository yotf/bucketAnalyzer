
import { useState } from 'react';
import MultiListBox from './atoms/MultiListBox';
import SingleListBox from './atoms/SingleListBox';
import Button from './atoms/Button';


type FileProcessorProps = {
  buckets: string[];
  filesByBucket: Record<string, string[]>;
  onProcessFiles: (bucket: string, files: string[]) => void;
};

const FileProcessor: React.FC<FileProcessorProps> = ({
  buckets,
  filesByBucket,
  onProcessFiles,
}) => {
  const [selectedBucket, setSelectedBucket] = useState<string>(buckets[0]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleProcessFiles = () => {
    if (selectedBucket) {
      onProcessFiles(selectedBucket, selectedFiles);
    }
  };

  return (
    <div className="p-4 flex justify-end items-center gap-10">
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
          options={selectedBucket? filesByBucket[selectedBucket] : []}
          selected={selectedFiles}
          onChange={setSelectedFiles}
        />
      
      <Button
        onClick={handleProcessFiles}
        disabled={!selectedBucket}
        className='mt-[23px]'

      >
        Process Selected Files
      </Button>
    </div>
  );
};

export default FileProcessor;
