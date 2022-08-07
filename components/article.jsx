import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Date from './date';
import getStrapiMedia from '../lib/media';
import Typography from '@mui/material/Typography';

export default function Articles({ articles }) {
  //articles.map((article) => console.log(article.attributes.cover));
  const articlesCol = 3;
  const containerWidth = 1200;
  const imageWidth = containerWidth / articlesCol;

  return (
    <Grid container spacing={2}>
      {articles.map((article) => (
        <Link href={`/articles/${article.id}`}>
          <Grid item xs={4}>
            <Image
              src={getStrapiMedia(article.attributes.cover)}
              width={imageWidth}
              height={
                (imageWidth / article.attributes.cover.data.attributes.width) *
                article.attributes.cover.data.attributes.height
              }
              quality={10}
              //layout="responsive"
            />
            <small>
              <Date dateString={article.attributes.publishedAt} />
            </small>
            <Typography component="h4" variant="h4" sx={{ fontWeight: 'light' }}>
              {article.attributes.title}
            </Typography>
          </Grid>
        </Link>
      ))}
    </Grid>
  );
}
