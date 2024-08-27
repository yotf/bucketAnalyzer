import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import CryptoJS from "crypto-js";

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

type ProcessFileParams = {
  bucket: string;
  files: string[];
};

export const useProcessFiles = () => {
  return useMutation({
    mutationFn: async ({ bucket, files }: ProcessFileParams) => {
      const processingResults = [];
      for (const file of files) {
        const response = await fetchFile(bucket, file);

        const fileContent = response.content;

        const hash = CryptoJS.SHA256(fileContent).toString();

        const classification = fileContent.includes("virus")
          ? "Malware"
          : "Goodware";

        const processingInfo = {
          bucketName: bucket,
          fileName: file,
          fileContentHash: hash,
          processingTimestamp: new Date().toISOString(),
          classification: classification,
          fileSize: fileContent.length,
          fileType: "text/plain",
        };
        processingResults.push(processingInfo);

        localStorage.setItem(
          `processedFile-${bucket}-${file}`,
          JSON.stringify(processingInfo)
        );
      }

      return processingResults;
    },

    onError: (error: AxiosError<{ error: string }>) => {
      if (error.response) {
        toast.error(`Error processing files: ${error.response.data.error}`);
      } else if (error.request) {
        toast.error("Network error: Please check your connection.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    },
    onSuccess: (data) => {
      toast.success(`All files processed successfully!`);
    },
  });
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
    onError: (error: AxiosError<{ error: string }>) => {
      debugger;
      toast.error(`Error creating bucket: ${error?.response?.data?.error}`);
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
