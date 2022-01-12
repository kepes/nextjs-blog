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

const theme = createTheme();

export default function Layout({ children, home }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <HeadMeta title={siteTitle} description="ez itt a site description" />
      </Head>
      <Header title="Blog" sections={sections} />
      <Container maxWidth="md">
        <header
        //className={styles.header}
        >
          {home ? (
            <>
              <Image
                priority
                src="/images/profile.jpg"
                //className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt={name}
              />
              <h1
              //className={utilStyles.heading2Xl}
              >
                {name}
              </h1>
            </>
          ) : (
            <>
              <Link href="/">
                <a>
                  <Image
                    priority
                    src="/images/profile.jpg"
                    //className={utilStyles.borderCircle}
                    height={108}
                    width={108}
                    alt={name}
                  />
                </a>
              </Link>
              <h2
              //className={utilStyles.headingLg}
              >
                <Link href="/">
                  <a
                  //className={utilStyles.colorInherit}
                  >
                    {name}
                  </a>
                </Link>
              </h2>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div
          //className={styles.backToHome}
          >
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
