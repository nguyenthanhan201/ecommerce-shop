import { useEffect } from "react";

const getDevice = (userAgent: string, vendor: string) => {
  const isAndroid = Boolean(userAgent.match(/Android/i));
  const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = Boolean(userAgent.match(/Opera Mini/i));
  const isWindows = Boolean(userAgent.match(/IEMobile/i));
  const isSSR = Boolean(
    !(
      typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
    )
  );
  const isSafari =
    vendor.match(/apple/i) &&
    !userAgent.match(/crios/i) &&
    !userAgent.match(/fxios/i) &&
    !userAgent.match(/Opera|OPT\//);

  const isMobile = Boolean(isAndroid || isIos || isOpera || isWindows);
  const isDesktop = Boolean(!isMobile);
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
    isSafari,
  };
};
export function useDevice() {
  useEffect(() => { }, []);
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
  const vendor = typeof navigator === "undefined" ? "SSR" : navigator.vendor;
  return getDevice(userAgent, vendor);
}
