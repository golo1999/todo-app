import { useCallback, useLayoutEffect, useState } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState([0, 0]);

  const updateWindowSize = useCallback(
    () => setWindowSize([window.innerWidth, window.innerHeight]),
    []
  );

  useLayoutEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    updateWindowSize();

    return () => window.removeEventListener("resize", updateWindowSize);
  }, [updateWindowSize]);

  return { width: windowSize[0], height: windowSize[1] };
}
