import Link from "next/link";
import { headers } from "next/headers";
import React from "react";

function truncate(text, maxWords) {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return text;
}

const FacebookNews = async () => {
  try {
    let error, latestCaptions;
    const host = headers().get("host");
    const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
    const user_access_token = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
    // Use your actual user access token and page ID
    const pageId = "480323335835739";
    const response = await fetch(
      `${protocol}://${host}/api/facebook-access-token-endpoint`,
      {
        next: {
          revalidate: 600,
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page_id: pageId,
          user_access_token: user_access_token,
        }),
      }
    );
    const res = await response.json();
    const { page_access_token } = res;
    console.log(res);
    if (page_access_token) {
      const secondResponse = await fetch(
        `${protocol}://${host}/api/facebook-data`,
        {
          next: {
            revalidate: 600,
          },
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pageId: pageId,
            isPageToken: true,
            page_access_token,
          }),
        }
      );

      const { data } = await secondResponse.json();

      console.log("Raw data:", data);

      // Filter posts that have type "photo"
      const postsWithImagesAndCaptions = data.filter(
        (post) =>
          post.attachments &&
          post.attachments.data &&
          post.attachments.data.some(
            (attachment) =>
              attachment.media &&
              ((attachment.media.image && attachment.type === "photo") ||
                attachment.type === "album")
          ) &&
          post.message
      );
      // Sort posts by timestamp in descending order
      postsWithImagesAndCaptions.sort(
        (a, b) => b.created_time - a.created_time
      );

      // // Get the latest three posts
      latestCaptions = postsWithImagesAndCaptions
        .slice(0, 3)
        .map(
          (post) =>
            post.attachments.data[0].media.caption ||
            post.message ||
            "No Caption"
        );

      // setCaptions(latestCaptions);

      console.log("Latest captions:", latestCaptions);
    } else {
      error = "no access token generated";
    }

    // if (isLoading) {
    //   return (
    //     <div>
    //       <Image src="/images/loading.svg" alt="loading" width={70} height={70} />
    //     </div>
    //   );
    // }

    if (error) {
      return <p>Error: {error}</p>;
    }

    return (
      <div className="w-full flex flex-row gap-5 mt-[24px]">
        {latestCaptions?.map((caption, index) => (
          <Link
            href={`/facebook-post/${index + 1}`}
            key={index}
            className="flex flex-col w-4/12 h-[120px] border-r border-[#CBCBCB] justify-between items-start"
          >
            <p className="text-[14px] font-extrabold">
              {truncate(caption, 15)}
            </p>
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    console.error("Error fetching or processing data:", error.message);
    error = "Error fetching or processing data. Please try again later.";
  }
};

export default FacebookNews;
