import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';
import { useContext } from 'react';
import Header from './header';
import Footer from './footer';
import SmoothScroll from './SmoothScroll/SmoothScroll';
import { GlobalContext } from '../pages/_app';
import getStrapiMedia from '../lib/media';
import Seo from "./seo";

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
          fontSize: '1.4rem',
        },
        description: {
          fontWeight: 'light',
          fontSize: '0.9rem',
        },
        col: {},
        row: {},
        instances: {
          1: {
            title: {
              fontWeight: 'light',
              fontSize: '2.0rem',
            },
            description: {
              fontWeight: 'light',
              fontSize: '1.2rem',
            },
            row: {
              odd: {},
              even: {},
            },
            col: {
              odd: {},
              even: { mt: 2 },
            },
          },
          2: {
            mainTitle: {
              textAlign: 'left',
            },
            mainDescription: {
              textAlign: 'left',
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

export default function Layout({ children, seo }) {
  const { favicon, siteName, footerText, siteTitle } = useContext(GlobalContext);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>{siteTitle}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="shortcut icon"
          href={getStrapiMedia(favicon)}
        />
      </Head>
      <Seo seo={seo} />
      <Header title="Blog" />
      <Box component="main" sx={{ bgcolor: 'background.paper' }}>
        <main>{children}</main>
      </Box>
      <Footer
        title={siteName}
        description={footerText}
      />
    </ThemeProvider>
  );
}

Layout.defaultProps = {
  children: [],
};

Layout.propTypes = {
  children: PropTypes.node,
};
