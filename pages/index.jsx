import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
// import utilStyles from "../styles/utils.module.css";
// import { getSortedPostsData } from '../lib/posts';
import Advanteges from '../components/Advanteges/Advanteges';
import Articles from '../components/article';
import Featured from '../components/featured';
import FooterMenu from '../components/FooterMenu';
import ImageList from '../components/ImageList';
import { InstagramQuilted } from '../components/Instagram/Instagram';
import { getInstagramPictures } from '../components/Instagram/InstagramBasicApi';
import Config from '../data/site_config.json';
import { fetchAPI } from '../lib/api';

export async function getStaticProps() {
  const articles = await fetchAPI('/articles', {
    populate: ['cover', 'category'],
  });
  const footerMenu = await fetchAPI('/footer-menus', {
    populate: { elements: { populate: '*' } },
  });

  // console.log(footerMenu.data[0]);
  // console.log(footerMenu.data[0].attributes.elements[0].page);
  // console.log(footerMenu.data[0].attributes.elements[0].article.data);

  const instagramImages = await getInstagramPictures(
    process.env.Instagram_Access_Token,
    12,
  );
  return {
    props: {
      articles: articles.data,
      footerMenu: footerMenu.data,
      instagramImages,
    },
  };
}

export default function Home({ articles, instagramImages, footerMenu }) {
  return (
    <Layout>
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
        <Grid item xs={2} />
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
      <Container
        maxWidth="lg"
        sx={{
          mt: 10,
        }}
      >
        <ImageList
          images={Config.imageLists[0].images}
          title={Config.imageLists[0].title}
          subtitle={Config.imageLists[0].subtitle}
        />
      </Container>
      <Grid container spacing={2} mt={10}>
        <Grid item xs={2} />
        <Grid item xs={5}>
          <Featured
            id={2}
            title={Config.featured[2].title}
            description={Config.featured[2].description}
            sections={Config.featured[2].sections}
            topIcon={false}
            columns={2}
            minElevation={0}
            maxElevation={0}
          />
        </Grid>
        <Grid item xs={5} position="relative" mt={15}>
          <Image
            src="/images/strawberry.jpg"
            width="3840"
            height="1740"
            layout="responsive"
            quality={10}
          />
        </Grid>
      </Grid>
      <Container maxWidth="lg">
        <Articles articles={articles} />
      </Container>
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <FooterMenu menu={footerMenu} />
      </Container>
    </Layout>
  );
}

Home.defaultProps = {
  allPostsData: [],
  instagramImages: [],
};

Home.propTypes = {
  articles: PropTypes.arrayOf(
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
