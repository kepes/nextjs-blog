import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { smoothScrollCallbacks } from './SmoothScrollCallbacks';

export default function SmoothScroll({ children }) {
  const ease = 0.005;
  const minimum = 1;
  let previous = 0;

  const scrollingContainerRef = useRef();

  if (typeof window !== 'undefined') {
    // I'm not sure if it is necessary or not to change "height" on "resize"
    // if it's calculated on every "onscroll"
    /* const getHeight = () => window.innerHeight;

    const [windowHeight, setWindowHeight] = useState(getHeight());

    useEffect(() => {
      const handleResize = () => {
        setWindowHeight(getHeight());
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    */

    const setBodyHeight = () => {
      document.body.style.height = `${
        scrollingContainerRef.current.getBoundingClientRect().height
      }px`;
    };

    const smoothScrollingHandler = () => {
      const current = window.scrollY;
      const diff = current - previous;
      previous += diff * ease;
      const rounded = Math.round(previous);

      scrollingContainerRef.current.style.transform = `translateY(${-rounded}px)`;

      smoothScrollCallbacks.forEach((event) => {
        event(rounded);
      });
      if (Math.abs(diff) > minimum) requestAnimationFrame(() => smoothScrollingHandler());
    };

    useEffect(() => {
      setBodyHeight();
      const onScroll = () => {
        // setBodyHeight() necessary before calculations because lazy loaded components!
        setBodyHeight();
        requestAnimationFrame(() => smoothScrollingHandler());
      };
      window.addEventListener('scroll', onScroll);
    });
  }

  return (
    <div className="smoothscroll-parent">
      <div ref={scrollingContainerRef}>{children}</div>
    </div>
  );
}

SmoothScroll.defaultProps = {
  children: [],
};

SmoothScroll.propTypes = {
  children: PropTypes.node,
};
