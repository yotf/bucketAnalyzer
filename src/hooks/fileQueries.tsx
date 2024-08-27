import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import toast from "react-hot-toast";

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
  return response.data || [];
};

export const useFiles = (bucketName: string) => {
  return useQuery({
    queryKey: ["files", bucketName],
    queryFn: () => fetchFiles(bucketName),
    enabled: !!bucketName,
  });
};

export const fetchFile = async (bucketName: string, fileName: string) => {
  const response = await axios.get(
    `http://localhost:3001/buckets/${bucketName}/files/${fileName}`
  );
  return response.data;
};

export const useCreateBucket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: { bucketName: string }) => {
      const { bucketName } = variables;
      await axios.post("http://localhost:3001/buckets", { bucketName });
    },

    onSuccess: () => {
      toast.success("Bucket created successfully!");
      queryClient.invalidateQueries({ queryKey: ["buckets"] });
    },
    onError: (error) => {
      debugger;
      toast.error(
        `Error creating bucket: ${axios.isAxiosError(error) ? error?.response?.data?.error : error.message}`
      );
    },
  });
};

export const useCreateFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: {
      bucketName: string;
      fileName: string;
      content: string;
    }) => {
      const { bucketName, fileName, content } = variables;
      return axios.post(`http://localhost:3001/buckets/${bucketName}/files`, {
        fileName,
        content,
      });
    },

    onSuccess: (data, variables) => {
      toast.success("File created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["files", variables.bucketName],
      });
    },
    onError: (error) => {
      toast.error(
        `Error creating file: ${axios.isAxiosError(error) ? error?.response?.data?.error : error.message}`
      );
    },
  });
};
