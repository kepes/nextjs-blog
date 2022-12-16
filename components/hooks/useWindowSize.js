import { useState, useEffect } from "react";

export default function useWindowSize() {
  

  //const [windowSize, setWindowSize] = useState(getSize);
  let windowSize = {
    width: 0,
    height: 0,
  };
  
  useEffect(() => {
    const getSize = () => {
      //if (typeof window !== "undefined") {
        // browser code
        return {
          width: window.innerWidth,
          height: window.innerHeight,
        };
      /*}
      return {
          width: 0,
          height: 0,
        };*/
    };
    
    windowSize = getSize();

    const handleResize = () => {
      windowSize = getSize();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
