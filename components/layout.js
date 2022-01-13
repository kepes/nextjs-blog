import Head from "next/head";
import Image from "next/image";
//import styles from "./layout.module.css";
//import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./header";
import Footer from "./footer";
import HeadMeta from "./head_meta";

const name = "Peter Kepessss";
export const siteTitle = "Next.js Sample Website";
export const siteDescription = "Next.js Sample Website Description";
const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" }
];

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto"].join(",")
  },
  components: {
    // Name of the component
    MuiAppBar: {
      defaultProps: {
        // Some CSS
        color: "transparent",
        elevation: 0
      }
    }
  },
  template: {
    sectionDivider: {
      wave1: {
        position: "relative",
        top: "-48px",
        marginBottom: "-70px",
        left: 0,
        width: "100%",
        overflow: "hidden",
        lineHeight: 0,
        transform: "rotate(180deg)"
      },
      wave1Svg: {
        position: "relative",
        display: "block",
        width: "calc(100% + 1.3px)",
        height: "49px"
      },
      wave1ShapeFill: {
        fill: "#fff"
      }
    }
  }
});

export default function Layout({ children, home }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteDescription} />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Header title="Blog" sections={sections} />
      <Box component="main" sx={{ bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <main>{children}</main>
        </Container>
      </Box>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
