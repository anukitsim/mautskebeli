"use client";

import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import Navigation from "../components/Navigation";

const Live = () => {
  const [liveVideos, setLiveVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const pageAccessToken = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
  const pageId = "480323335835739";
  const apiVersion = "v13.0";

  // Fetch live videos
  useEffect(() => {
    const fetchLiveVideos = async () => {
      setIsLoading(true);
      let nextPageUrl = `https://graph.facebook.com/${apiVersion}/${pageId}/live_videos?fields=id,description,embed_html&access_token=${pageAccessToken}&limit=25`;

      const fetchPage = async (url) => {
        try {
          const response = await fetch(url, {
            next: {
              revalidate: 600,
            },
          });
          const data = await response.json();
          // Check if data.data exists and is an array
          if (data && Array.isArray(data.data)) {
            setLiveVideos((prevVideos) => [...prevVideos, ...data.data]);
          } else {
            // Handle the case where data.data does not exist or is not an array
            console.warn("Unexpected response format:", data);
          }
          if (data.paging && data.paging.next) {
            await fetchPage(data.paging.next);
          } else {
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Failed to fetch live videos:", error);
          setIsLoading(false);
        }
      };

      await fetchPage(nextPageUrl);
    };

    fetchLiveVideos();
  }, [apiVersion, pageAccessToken, pageId]);

  // Rendering logic remains unchanged
  if (isLoading) {
    return <div className="p-5">Loading...</div>;
  }
  console.log(liveVideos);
  return (
    <div>
      <div className="sticky top-0 z-50 overflow-hidden">
        <Header />
        <Navigation />
      </div>

      <div className="flex flex-row w-full">
        <div className="flex w-8/12">
          <div className="w-full">
            <h2 className="text-3xl mb-4 font-bold">Live Stream</h2>
            {liveVideos.length > 0 && (
              <>
                <div
                  className="video-container-fb mb-4"
                  dangerouslySetInnerHTML={{
                    __html: selectedVideo || liveVideos[0].embed_html,
                  }}
                />
              </>
            )}
          </div>
        </div>
        {/* Adjust this div to have a fixed height and be scrollable */}
        <div
          className="flex flex-col mt-12 w-4/12 overflow-y-auto"
          style={{ maxHeight: "550px" }}
        >
          {liveVideos.map((video, index) => (
            <div
              key={video.id + index}
              className="video-card cursor-pointer mb-2" // Added mb-2 for some spacing between items
              onClick={() => setSelectedVideo(video.embed_html)}
            >
              <div className="border-2 p-2">
                {" "}
                {/* Added p-2 for padding */}
                <p className="video-title text-sm font-semibold">
                  {video.description || "Untitled Video"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Live;
