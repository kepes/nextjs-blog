import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Image from 'next/image';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export function InstagramBasic({ images }) {
  return images.map((item) => (
    <Box
      sx={{
        width: 200,
        height: 200,
        position: 'relative',
        backgroundColor: 'primary.dark',
      }}
    >
      <Image
        key={item.id}
        src={item.media_url}
        layout="fill"
        objectFit="cover"
      />
    </Box>
  ));
}

/* function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
} */

export function InstagramQuilted({ images }) {
  const order = [
    [2, 2],
    [1, 1],
    [1, 1],
    [2, 1],
    [1, 1],
    [1, 1],
    [2, 2],
    [2, 1],
  ];
  return (
    <ImageList
      sx={{ width: '100%' }}
      variant="quilted"
      cols={4}
      rowHeight={150}
      gap={2}
    >
      {images.map((item, key) => (
        <ImageListItem
          key={item.id}
          cols={order[key % order.length][0]}
          rows={order[key % order.length][1]}
        >
          <Image
            key={item.id}
            src={item.media_url}
            layout="fill"
            objectFit="cover"
            quality={10}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

InstagramBasic.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      media_url: PropTypes.string,
    }),
  ).isRequired,
};

InstagramQuilted.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      media_url: PropTypes.string,
    }),
  ).isRequired,
};
