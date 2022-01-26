import React, { useEffect, useRef } from "react";

//import "./SmoothScroll.css";
//import useWindowSize from "../hooks/useWindowSize";

const SmoothScroll = ({ children }) => {
  // 1.
  //const windowSize = useWindowSize();
  const ease = 0.05;
  const minimum = 10;
  const previous = 0;

  const scrollingContainerRef = useRef();

  // 4.
  if (typeof window !== "undefined") {
    /*useEffect(() => {
      setBodyHeight();
    });

    const setBodyHeight = () => {
      document.body.style.height = `${
        scrollingContainerRef.current.getBoundingClientRect().height
      }px`;
    };*/

    // 5.
    /*useEffect(() => {
      requestAnimationFrame(() => smoothScrollingHandler());
    }, [window.scrollY]);*/

    useEffect(() => {
      const onScroll = (e) => {
        requestAnimationFrame(() => smoothScrollingHandler());
      };
      window.addEventListener("scroll", onScroll);
    });

    const smoothScrollingHandler = () => {
      const current = window.scrollY;
      const diff = current - previous;
      previous += diff * ease;
      //const rounded = Math.round(data.previous * 100) / 100;

      /*console.log("smoothScrollingHandler");
      console.log("current: " + data.current);
      console.log("previous: " + data.previous);
      console.log("diff: " + data.diff);*/

      scrollingContainerRef.current.style.transform = `translateY(${Math.round(previous) * -1}px)`;

      if (Math.abs(diff) > 0.5) requestAnimationFrame(() => smoothScrollingHandler());
    };
  }

  return (
    <div className="parent">
      <div ref={scrollingContainerRef}>{children}</div>
    </div>
  );
};

export default SmoothScroll;
