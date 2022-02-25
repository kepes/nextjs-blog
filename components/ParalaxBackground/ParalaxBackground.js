import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

function ParalaxBackground(props) {
  const {
    children,
    image,
    sx,
    speed,
    backgroundTop,
    backgroundLeft,
    minScrollPercent,
    scrollCallbacks,
    ...rest
  } = props;
   
  const paralaxConationerRef = useRef();
  let calculatedImageWidth = image.width;
  let calculatedImageHeight = image.height;
  let calculatedTop = 0;
  let calculatedLeft = 0;

  sx["backgroundImage"] = `url(${image.src})`;

  useEffect(() => {
    
    const scrollBackground = (y) => {
      let scrollby = y * -speed + calculatedTop;
      const maxMove =
        calculatedImageHeight - paralaxConationerRef.current.clientHeight;
      if (scrollby > maxMove) scrollby = maxMove;

      paralaxConationerRef.current.style.backgroundPositionY = `-${scrollby}px`;
    }
  
    const onScroll = (e) => {
      scrollBackground(window.scrollY);
    };

    const onResize = (e) => {
      const clientWidth = paralaxConationerRef.current.clientWidth;
      const clientHeight = paralaxConationerRef.current.clientHeight;
      const minScrollHeight = clientHeight * ((minScrollPercent + 100) / 100);

      let imageWidth = clientWidth;
      let imageHeight = minScrollHeight;
      
      if (imageWidth >= imageHeight) {
        imageHeight = (imageWidth / image.width) * image.height;
        if (imageHeight < minScrollHeight) {
          imageHeight = minScrollHeight;
          imageWidth = (imageHeight / image.height) * image.width;
        }
      } else {
        imageWidth = (imageHeight / image.height) * image.width;
        if (imageWidth < clientWidth) {
          imageWidth = clientWidth;
          imageHeight = (imageWidth / image.width) * image.height;
        }
      }
      if (backgroundTop == -1) {
        calculatedTop = (imageHeight - clientHeight) / 2;
      }
      if (backgroundLeft == -1) {
        calculatedLeft = (imageWidth - clientWidth) / 2;
      }

      calculatedImageWidth = imageWidth;
      calculatedImageHeight = imageHeight;

      paralaxConationerRef.current.style.backgroundSize = `${imageWidth}px ${imageHeight}px`;
      paralaxConationerRef.current.style.backgroundPositionX = `-${calculatedLeft}px`;

      onScroll();
    };
    onResize();
    window.addEventListener("resize", onResize);
    if (typeof scrollCallbacks == "undefined")
      window.addEventListener("scroll", onScroll);
    else scrollCallbacks.push(scrollBackground);
  });

  return (
    <Box ref={paralaxConationerRef} sx={sx} {...rest}>
      {children}
    </Box>
  );
}

ParalaxBackground.defaultProps = {
  speed: 0.5,
  backgroundTop: -1,
  backgroundLeft: -1,
  minScrollPercent: 100,
};

ParalaxBackground.propTypes = {
  image: PropTypes.object.isRequired,
  speed: PropTypes.number.isRequired,
  backgroundTop: PropTypes.number.isRequired,
  backgroundLeft: PropTypes.number.isRequired,
  minScrollPercent: PropTypes.number.isRequired,
  scrollCallbacks: PropTypes.array
};

export default ParalaxBackground;
