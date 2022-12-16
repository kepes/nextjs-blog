import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography';

function ImageListItemComponent({ item }) {
  const [elevation, setElevation] = useState(60);

  const onMouseEnter = () => {
    setElevation(0);
  };
  const onMouseLeave = () => {
    setElevation(60);
  };

  return (
    <ImageListItem
      sx={{ overflow: 'hidden' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      
      <Image src={item.image} layout="fill" objectFit="cover" quality={1}/>

      <ImageListItemBar
        title={item.title}
        subtitle={item.subtitle}
        sx={{
          transform: `translateY(${elevation}px)`,
          transition: 'all 0.3s ease 0s',
        }}
      />
    </ImageListItem>
  );
}

export default function ImageListComponent({ title, subtitle, images }) {
  return (
    <>
      {title !== null ? (
        <Typography component="h4" variant="h4" align="center" paragraph>
          {title}
        </Typography>
      ) : (
        ''
      )}
      {subtitle !== null ? (
        <Typography variant="subtitle1" align="center" paragraph>
          {subtitle}
        </Typography>
      ) : (
        ''
      )}

      <ImageList sx={{ width: '100%', height: '50vh' }} cols={3} gap={20}>
        {images.map((item) => (
          <ImageListItemComponent key={item.image} item={item} />
        ))}
      </ImageList>
    </>
  );
}
