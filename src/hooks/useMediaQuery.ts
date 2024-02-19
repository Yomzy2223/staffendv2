import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    media.addEventListener("change", () => setMatches(media.matches));

    return () =>
      media.removeEventListener("change", () => setMatches(media.matches));
  }, [query]);

  return matches;
}

export default useMediaQuery;
