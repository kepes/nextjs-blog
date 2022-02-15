import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
//import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import Featured from "../components/featured";
import Config from "../data/site_config";
import {Instagram, getInstagramPictures} from "../components/Instagram/Instagram"

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const instagramImages = await getInstagramPictures(process.env.Instagram_Access_Token);;
  return {
    props: {
      allPostsData,
      instagramImages
    },
  };
}

export default function Home({ allPostsData, instagramImages }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Featured
        title={Config.featured.title}
        description={Config.featured.description}
        sections={Config.featured.sections}
      />
 
      <Instagram images={instagramImages} />
 
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
    </Layout>
  );
}
