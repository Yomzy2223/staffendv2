import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useGlobalFucntions = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

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

  const setQuery = (name: string, value: string | number) => {
    router.push(pathname + "?" + createQueryString(name, value), {
      scroll: false,
    });
  };

  return {
    createQueryString,
    setQuery,
  };
};
