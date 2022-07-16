import { createContext, useContext, useEffect, useState } from "react";

interface IResposiveContext {
  isMobile: boolean;
  isDesktop: boolean;
}

export const ResponsiveContext = createContext<IResposiveContext>({
  isMobile: false,
  isDesktop: false,
});

const [width, height] = [window.innerWidth, window.innerHeight]; // get the current window size

console.log({ width, height });

export const ResponsiveProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const [width, height] = [window.innerWidth, window.innerHeight]; // get the current window size
      if (width < 768) {
        setIsMobile(true);
        setIsDesktop(false);
      } else {
        setIsMobile(false);
        setIsDesktop(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={{ isMobile, isDesktop }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = () => {
  const context = useContext(ResponsiveContext);
  if (context === undefined) {
    throw new Error("useResponsive must be used within a ResponsiveProvider");
  }
  return context;
};
export const useIsMobile = () => {
  const context = useResponsive();
  return context.isMobile;
};
export const useIsDesktop = () => {
  const context = useResponsive();
  return context.isDesktop;
};
