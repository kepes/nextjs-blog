import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

function ParalaxBackground(props) {
  const {
    children,
    image,
    imageHeight,
    sx,
    speed,
    backgroundTop,
    backgroundLeft,
    minScrollPercent,
    ...rest
  } = props;
  const paralaxConationerRef = useRef();
  let calculatedImageWidth = image.width;
  let calculatedImageHeight = image.height;
  let calculatedTop = 0;
  let calculatedLeft = 0;

  sx["backgroundImage"] = `url(${image.src})`;

  useEffect(() => {
    const onScroll = (e) => {
      let scrollby = window.scrollY * speed + calculatedTop;
      const maxMove =
        calculatedImageHeight - paralaxConationerRef.current.clientHeight;
      if (scrollby > maxMove) scrollby = maxMove;
      paralaxConationerRef.current.style.backgroundPositionY = `-${scrollby}px`;
    };

    const onResize = (e) => {
      const clientWidth = paralaxConationerRef.current.clientWidth;
      const clientHeight = paralaxConationerRef.current.clientHeight;
      let imageWidth = clientWidth;
      let imageHeight = clientHeight;
      const minScrollHeight = clientHeight * ((minScrollPercent + 100) / 100);

      imageHeight = (imageHeight < minScrollHeight) ? minScrollHeight : imageHeight;

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
    window.addEventListener("scroll", onScroll);
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
  minScrollPercent: 20,
};

ParalaxBackground.propTypes = {
  image: PropTypes.object.isRequired,
  imageHeight: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  backgroundTop: PropTypes.number.isRequired,
  backgroundLeft: PropTypes.number.isRequired,
  minScrollPercent: PropTypes.number.isRequired,
};

export default ParalaxBackground;
