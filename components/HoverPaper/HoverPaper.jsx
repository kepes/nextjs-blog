import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

function HoverPaper(props) {
  const [shadow, setShadow] = useState(props.minelevation);
  const [mouseInside, setMouseInside] = useState(false);

  const onMouseEnter = () => {
    setMouseInside(true);
  };
  const onMouseLeave = () => {
    setMouseInside(false);
  };

  useEffect(() => {
    setShadow(mouseInside ? props.maxelevation : props.minelevation);
  }, [mouseInside]);

  return (
    <Paper
      {...props}
      elevation={shadow}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.children}
    </Paper>
  );
}

export default HoverPaper;
