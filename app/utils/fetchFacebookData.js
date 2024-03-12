const fetchFacebookData = async (accessToken, pageId, isPageToken) => {
  try {
    const baseEndpoint = isPageToken
      ? `https://graph.facebook.com/v13.0/${pageId}`
      : "https://graph.facebook.com/v13.0/me";

    const response = await fetch(
      `${baseEndpoint}/posts?fields=message,attachments{caption,media,type,subattachments{media}},stream_status&access_token=${accessToken}`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    const data = await response.json();

    console.log("data", data);

    if (response.ok) {
      // Filter out posts without attachments, with video/live video types, and live stream posts
      const filteredData = data.data.filter(
        (post) =>
          post.attachments &&
          post.attachments.data &&
          post.attachments.data.some(
            (attachment) =>
              attachment.media &&
              (attachment.media.image || attachment.media.album)
          ) &&
          post.message &&
          (!post.stream_status || post.stream_status !== "LIVE")
      );

      return filteredData || [];
    } else {
      throw new Error(`Error fetching data: ${data.error.message}`);
    }
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

export default fetchFacebookData;
