import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBuckets = async () => {
  const response = await axios.get("http://localhost:3001/buckets");
  return response.data;
};

export const useBuckets = () => {
  return useQuery({ queryKey: ["buckets"], queryFn: fetchBuckets });
};

const fetchFiles = async (bucketName: string) => {
  const response = await axios.get(
    `http://localhost:3001/buckets/${bucketName}/files`
  );
  return response.data;
};

export const useFiles = (bucketName: string) => {
  return useQuery({
    queryKey: ["files", bucketName],
    queryFn: () => fetchFiles(bucketName),
    enabled: !!bucketName,
  });
};
