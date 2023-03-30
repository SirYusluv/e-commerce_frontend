import { useState, useEffect } from "react";

export default function useResponsive(query) {
  const [matches, setMatches] = useState(false);

  useEffect(
    function () {
      const media = window.matchMedia(query);
      media.matches !== matches && setMatches(media.matches);

      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);

      return () => window.removeEventListener("resize", listener);
    },
    [matches, query]
  );

  return matches;
}