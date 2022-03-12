import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';
import Header from './header';
import Footer from './footer';
import SmoothScroll from './SmoothScroll/SmoothScroll';

export const siteTitle = 'Next.js Sample Website';
export const siteDescription = 'Next.js Sample Website Description';

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: ['Roboto'].join(','),
    },
    components: {
      // Name of the component
      MuiAppBar: {
        defaultProps: {
          // Some CSS
          color: 'transparent',
          elevation: 0,
        },
      },
    },
    template: {
      featured: {
        mainTitle: { fontWeight: 'light', mt: '40px' },
        mainDescription: { fontWeight: 'light' },
        icon: { fontSize: 80 },
        title: {
          fontWeight: 'light',
        },
        description: {
          fontWeight: 'light',
        },
        instances: {
          1: {
            row: {
              odd: {},
              even: {},
            },
            col: {
              odd: {},
              even: { mt: 2 },
            },
          },
        },
      },
      sectionDivider: {
        wave1: {
          position: 'relative',
          top: '-48px',
          marginBottom: '-70px',
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
          transform: 'rotate(180deg)',
        },
        wave1Svg: {
          position: 'relative',
          display: 'block',
          width: 'calc(100% + 1.3px)',
          height: '49px',
        },
        wave1ShapeFill: {
          fill: '#fff',
        },
      },
    },
  }),
);

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteDescription} />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SmoothScroll>
        <Header title="Blog" sections={sections} />
        <Box component="main" sx={{ bgcolor: 'background.paper' }}>
          <main>{children}</main>
        </Box>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </SmoothScroll>
    </ThemeProvider>
  );
}

Layout.defaultProps = {
  children: [],
};

Layout.propTypes = {
  children: PropTypes.node,
};
