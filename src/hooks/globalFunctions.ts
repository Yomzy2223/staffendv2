import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import useMediaQuery from "./useMediaQuery";
import { saveAs } from "file-saver";
import {
  MutationFunction,
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useResponse } from "./useResponse";

export const useGlobalFunctions = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value.toString());

      return params.toString();
    },
    [searchParams]
  );

  const deleteQueryString = useCallback(
    (name: string) => {
      const newQuery = new URLSearchParams(searchParams.toString());
      newQuery.delete(name);
      router.push(pathname + "?" + newQuery.toString());

      return newQuery.toString();
    },
    [searchParams]
  );

  const setQuery = (name: string, value: string | number) => {
    router.push(pathname + "?" + createQueryString(name, value), {
      scroll: false,
    });
  };

  const getRandColor = (i: number) => {
    return tagColors[i % 5];
  };

  return {
    createQueryString,
    deleteQueryString,
    setQuery,
    isDesktop,
    getRandColor,
  };
};

export const uploadFileToCloudinary = async ({
  getProgress,
  file,
  folderName,
}: {
  file: File;
  getProgress: (e: number) => void;
  folderName?: string;
}) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/raw/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
  );
  formData.append("folder", folderName ? `App V2/${folderName}` : "App V2");

  return await axios.post(url, formData, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        getProgress(percentCompleted);
      }
    },
  });
};

export const downloadFileFromCloudinary = (
  cloudinaryLink: string,
  fileName: string
) => {
  const result = axios
    .get(cloudinaryLink, {
      responseType: "blob",
    })
    .then((res) => {
      console.log(res);
      saveAs(res.data, fileName);
    })
    .catch((err) => {
      console.log(err.message);
      throw new Error(err);
    });

  return result;
};

export const tagColors = [
  {
    text: "hsl(300,100%,41%)",
    bg: "bg-[hsl(300,100%,91%)]",
  },
  {
    text: "hsl(250, 100%, 41%)",
    bg: "bg-[hsl(250,100%,91%)]",
  },
  {
    text: "hsl(200, 100%, 41%)",
    bg: "bg-[hsl(200,100%,91%)]",
  },
  {
    text: "hsl(150, 100%, 41%)",
    bg: "bg-[hsl(150,100%,91%)]",
  },
  {
    text: "hsl(100, 100%, 41%)",
    bg: "bg-[hsl(100,100%,91%)]",
  },
  {
    text: "hsl(50, 100%, 41%)",
    bg: "bg-[hsl(50,100%,91%)]",
  },
];
