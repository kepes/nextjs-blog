import React, { useEffect, useRef, useState } from "react";
import { smoothScrollCallbacks } from "./SmoothScrollCallbacks";

const SmoothScroll = ({ children }) => {
  const ease = 0.01;
  const minimum = 10;
  const previous = 0;

  const scrollingContainerRef = useRef();

  if (typeof window !== "undefined") {
    const getHeight = () => {
      return window.innerHeight;
    };

    const [windowHeight, setWindowHeight] = useState(getHeight());

    useEffect(() => {
      const handleResize = () => {
        setWindowHeight(getHeight());
      };

      window.addEventListener("resize", handleResize);
      return () => {
        console.log("removeEventListener");
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    // setBodyHeight isn't good at page load because of lazy loaded components!
    // you can check with setTimeout
    useEffect(() => {
      setBodyHeight();
      setTimeout(() => {
        console.log(
          "body height:" +
            scrollingContainerRef.current.getBoundingClientRect().height
        );
      }, 1000);
    }, []);

    const setBodyHeight = () => {
      document.body.style.height = `${
        scrollingContainerRef.current.getBoundingClientRect().height
      }px`;
    };

    useEffect(() => {
      const onScroll = (e) => {
        // setBodyHeight() necessary before calculations because lazy loaded components!
        setBodyHeight();
        requestAnimationFrame(() => smoothScrollingHandler());
      };
      window.addEventListener("scroll", onScroll);
    });

    const smoothScrollingHandler = () => {
      const current = window.scrollY;
      const diff = current - previous;
      previous += diff * ease;
      const rounded = Math.round(previous);

      scrollingContainerRef.current.style.transform = `translateY(${-rounded}px)`;

      smoothScrollCallbacks.forEach((event) => {
        event(rounded);
      });

      if (Math.abs(diff) > 0.5)
        requestAnimationFrame(() => smoothScrollingHandler());
    };
  }

  return (
    <div className="smoothscroll-parent">
      <div ref={scrollingContainerRef}>{children}</div>
    </div>
  );
};

export default SmoothScroll;
