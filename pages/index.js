import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
//import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import Featured from "../components/featured";
import Config from "../data/site_config";
import { InstagramQuilted } from "../components/Instagram/Instagram";
import { getInstagramPictures } from "../components/Instagram/InstagramBasicApi";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from "@mui/material/Button";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const instagramImages = await getInstagramPictures(
    process.env.Instagram_Access_Token,
    12
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
        <Grid item m={5} xs={4} justifyContent="center" sx={{
          justifyContent: "center",
          display: "flex",
    flexDirection: "column",
    justifyContent: "center"
        }}>
          <Typography component="h2" variant="h2">
            Great Responsive & Strong Competitive People
          </Typography>
          <Typography component="div" variant="subtitle1">
            Some hardworking People are Working Day and Night to provide you
            highly scalable product
          </Typography>
          <List dense={true} sx={{
            mt: 2 
          }}>
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIcon color="primary"/>
              </ListItemIcon>
              <ListItemText primary="Amazing communication experience" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText primary="Best designing experience with trending tools and sizes" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText primary="Training and communication method remotely" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText primary="24/7 Hour onine supports" />
            </ListItem>
          </List>
          <Button variant="contained" sx={{
            width: "8vw",
            mt: 5
          }}>Discover Item</Button>
          
        </Grid>
      </Grid>

      <Container maxWidth="md">
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
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
