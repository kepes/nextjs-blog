import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Image from "next/image";

async function callInstagramApi(uri, fields, access_token) {
  const instagram_url = "https://graph.instagram.com/";
  let apiResult = {};
  let apiError = false;

  await fetch(
    `${instagram_url}${uri}?fields=${fields}&access_token=${access_token}`
  )
    .then((res) => res.json())
    .then(
      (result) => {
        apiResult = result;
      },
      (error) => {
        apiError = error;
      }
    );
  return [apiResult, apiError];
}

export async function getInstagramPictures(access_token) {
  const child_fields =
    "id,media_type,media_url,thumbnail_url,username,timestamp";
  const media_fields = `${child_fields},caption`;

  const [mediaResponse, mediaError] = await callInstagramApi(
    "me/media",
    media_fields,
    access_token
  );

  if (mediaError) {
    setError(mediaError);
    return;
  }

  const images = [];
  let parentCount = 0;
  const asyncCalls = [];
  
  mediaResponse.data.forEach(async (post, key) => {
    if (post.media_type == "IMAGE") {
      images.push(post);
    } else if (post.media_type == "CAROUSEL_ALBUM") {
      if (parentCount++ < 2) {
        asyncCalls.push(callInstagramApi(
          `${post.id}/children`,
          child_fields,
          access_token
        ).then((res) => {
          const [childResponse, childError] = res;
          if (childError) {
            console.log("instagram API error: " + childError);
          } else {
            childResponse.data.forEach((child, key) => {
              if (child.media_type == "IMAGE") {
                images.push(child);
              }
            });
          }
        }));
      }
    }
  });

  await Promise.allSettled(asyncCalls).
    then((results) => {
        images.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);
    });

  return images;
  
}

function RenderImages(props) {
  return props.images.map((item) => (
    <Image key={item.id} src={item.media_url} width={200} height={200} />
  ));
}

export function Instagram(props) {
  /*const [error, setError] = useState(null);
  const [apiResult, setApiResult] = useState();

  useEffect(() => {
    getInstagramPictures(access_token, setApiResult, setError);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (typeof apiResult !== "undefined") {
    console.log("apiResult:");
    console.log(apiResult);
    return <RenderImages images={apiResult} />;
  } else {
    return <div>Initializing...</div>;
  }*/
  return props.images.map((item) => (
    <Image key={item.id} src={item.media_url} width={200} height={200} />
  ));
}
