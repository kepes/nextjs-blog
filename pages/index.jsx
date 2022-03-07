import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Layout, { siteTitle } from '../components/layout';
// import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';
import Featured from '../components/featured';
import Config from '../data/site_config.json';
import { InstagramQuilted } from '../components/Instagram/Instagram';
import { getInstagramPictures } from '../components/Instagram/InstagramBasicApi';
import Advanteges from '../components/Advanteges';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const instagramImages = await getInstagramPictures(
    process.env.Instagram_Access_Token,
    12,
  );
  return {
    props: {
      allPostsData,
      instagramImages,
    },
  };
}

export default function Home({ allPostsData, instagramImages }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Container maxWidth="md">
        <Featured
          title={Config.featured.title}
          description={Config.featured.description}
          sections={Config.featured.sections}
        />
      </Container>

      <Grid container spacing={2} mt={10}>
        <Grid item xs={6}>
          <InstagramQuilted images={instagramImages} />
        </Grid>
        <Grid
          item
          m={5}
          xs={4}
          justifyContent="center"
          sx={{
            mt: 'auto',
            mb: 'auto',
          }}
        >
          <Advanteges
            title={Config.advanteges.title}
            subtitle={Config.advanteges.subtitle}
            buttonText={Config.advanteges.buttonText}
            buttonLink={Config.advanteges.buttonLink}
            list={Config.advanteges.list}
          />
        </Grid>
      </Grid>

      <Container maxWidth="md">
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a href="#top">{title}</a>
              </Link>
              <br />
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
}

Home.defaultProps = {
  allPostsData: [],
  instagramImages: [],
};

Home.propTypes = {
  allPostsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      date: PropTypes.string,
      content: PropTypes.string,
    }),
  ),
  instagramImages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      media_url: PropTypes.string,
    }),
  ),
};
