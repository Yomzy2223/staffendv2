import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import useMediaQuery from "./useMediaQuery";

export const useGlobalFucntions = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 800px)");
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

  return {
    createQueryString,
    deleteQueryString,
    setQuery,
    isDesktop,
  };
};
