import { useEffect, useState } from "react";
import { MOBILE_PX } from "../styles";
import { useWindow } from "./useWindow";

export const useIsMobile = (): boolean => {
  const window = useWindow();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window?.innerWidth ? window?.innerWidth <= MOBILE_PX : false);

    window?.addEventListener("resize", handleResize);
    handleResize();

    return () => window?.removeEventListener("resize", handleResize);
  }, [window]);

  return isMobile;
};
