import { Box } from "@mui/material";
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
        console.log("instagram API error: " + error);
        apiError = error;
      }
    );
  return [apiResult, apiError];
}

async function createImageList(
  posts,
  child_fields,
  access_token,
  max_image_count,
  image_idx = 0,
  all_images_count = 0
) {
  let all_images = [];
  if (posts.length <= image_idx || all_images_count >= max_image_count)
    return all_images;

  const post = posts[image_idx];

  if (post.media_type == "IMAGE") {
    all_images.push(post);
  } else if (post.media_type == "CAROUSEL_ALBUM") {
    await callInstagramApi(
      `${post.id}/children`,
      child_fields,
      access_token
    ).then((res) => {
      const [childResponse, childError] = res;
      if (childError) {
        console.log("instagram API error: " + childError);
      } else {
        childResponse.data.forEach((child, key) => {
          if (
            child.media_type == "IMAGE" &&
            all_images.length + all_images_count < max_image_count
          ) {
            all_images.push(child);
          }
        });
      }
    });
  }

  if (
    posts.length > image_idx &&
    all_images_count + all_images.length < max_image_count
  ) {
    // Recursive call
    all_images = all_images.concat(
      await createImageList(
        posts,
        child_fields,
        access_token,
        max_image_count,
        image_idx + 1,
        all_images.length + all_images_count
      )
    );
  }
  return all_images;
}

async function createAllImageList(posts, child_fields, access_token) {
  const asyncCalls = [];
  const images = [];

  posts.forEach(async (post, key) => {
    if (post.media_type == "IMAGE") {
      images.push(post);
    } else if (post.media_type == "CAROUSEL_ALBUM") {
      asyncCalls.push(
        callInstagramApi(
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
        })
      );
    }
  });

  await Promise.allSettled(asyncCalls);
  images.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
  return images;
}

export async function getInstagramPictures(access_token, image_count) {
  const child_fields =
    "id,media_type,media_url,thumbnail_url,username,timestamp";
  const media_fields = `${child_fields},caption`;

  const [mediaResponse, mediaError] = await callInstagramApi(
    "me/media",
    media_fields,
    access_token
  );

  if (mediaError) {
    console.log(mediaError);
    return;
  }

  let images = [];
  if (typeof image_count == "undefined") {
    images = await createAllImageList(
      mediaResponse.data,
      child_fields,
      access_token
    );
  } else {
    images = await createImageList(
      mediaResponse.data,
      child_fields,
      access_token,
      image_count
    );
  }
  return images;
}

export function Instagram(props) {
  return props.images.map((item) => (
    <Box
      sx={{
        width: 200,
        height: 200,
        position: "relative",
        backgroundColor: "primary.dark",
      }}
    >
      <Image
        key={item.id}
        src={item.media_url}
        layout="fill"
        objectFit="cover"
      />
    </Box>
  ));
}
