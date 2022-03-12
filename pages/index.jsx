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
import Advanteges from '../components/Advanteges/Advanteges';

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
          title={Config.featured[0].title}
          description={Config.featured[0].description}
          sections={Config.featured[0].sections}
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
            title={Config.advanteges[0].title}
            subtitle={Config.advanteges[0].subtitle}
            buttonText={Config.advanteges[0].buttonText}
            buttonLink={Config.advanteges[0].buttonLink}
            list={Config.advanteges[0].list}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={10}>
        <Grid item xs={2}/>
        <Grid
          item
          xs={4}
          justifyContent="center"
          sx={{
            mt: 'auto',
            mb: 'auto',
          }}
        >
          <Advanteges
            title={Config.advanteges[1].title}
            subtitle={Config.advanteges[1].subtitle}
            buttonText={Config.advanteges[1].buttonText}
            buttonLink={Config.advanteges[1].buttonLink}
            list={Config.advanteges[1].list}
          />
        </Grid>
        <Grid item xs={4}>
          <Featured sections={Config.featured[1].sections} columns={2} id={1} />
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
