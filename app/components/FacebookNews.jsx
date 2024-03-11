"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

function truncate(text, maxWords) {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return text;
}

const FacebookNews = () => {
  const [captions, setCaptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use your actual user access token and page ID
        const pageId = "480323335835739";
        const response = await fetch("/api/facebook-access-token-endpoint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page_id: pageId }),
        });
        const { page_access_token } = await response.json();
        if (page_access_token) {
          const secondResponse = await fetch("/api/facebook-data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pageId: pageId,
              isPageToken: true,
              page_access_token,
            }),
          });

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
          const latestCaptions = postsWithImagesAndCaptions
            .slice(0, 3)
            .map(
              (post) =>
                post.attachments.data[0].media.caption ||
                post.message ||
                "No Caption"
            );

          setCaptions(latestCaptions);

          console.log("Latest captions:", latestCaptions);
        } else {
          setError("no access token generated");
        }
      } catch (error) {
        console.log(error);
        console.error("Error fetching or processing data:", error.message);
        setError("Error fetching or processing data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Add any dependencies if needed

  if (isLoading) {
    return (
      <div>
        <Image src="/images/loading.svg" alt="loading" width={70} height={70} />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-full flex flex-row gap-5 mt-[24px]">
      {captions.map((caption, index) => (
        <Link
          href={`/facebook-post/${index + 1}`}
          key={index}
          className="flex flex-col w-4/12 h-[120px] border-r border-[#CBCBCB] justify-between items-start"
        >
          <p className="text-[14px] font-extrabold">{truncate(caption, 15)}</p>
        </Link>
      ))}
    </div>
  );
};

export default FacebookNews;
