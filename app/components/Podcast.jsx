import React from "react";
import { parse } from "node-html-parser";
import PodcastContent from "./PodcastContent";
import { headers } from "next/headers";

const Podcast = async () => {
  try {
    let error,
      isLiveStraming,
      liveVideoId,
      videos = [];      
    const channelId = "UC6TjRdvXOknZBbtXiePp1HA";
    // const channelId = "UCMmpLL2ucRHAXbNHiCPyIyg";
    const apiKey = "AIzaSyDd4yHryI5WLPLNjpKsiuU1bYHnBgcK_u8";
    const playlistId = "PL8wF1aEA4P8NJZUazilLH7ES-T-RQd3Cy";

    const response = await fetch(
      `https://youtube.com/channel/${channelId}/live`,
      {
        redirect: "follow",
        cache: "no-store"
      }
    );
    const text = await response.text();
    const html = parse(text);
    const canonicalURLTag = html.querySelector("link[rel=canonical]");
    const canonicalURL = canonicalURLTag.getAttribute("href");
    let youtubeUrl = new URL(canonicalURL);
    let params = new URLSearchParams(youtubeUrl.search);
    liveVideoId = params.get("v");
    const isStreaming = canonicalURL.includes("/watch?v=");
    isLiveStraming = isStreaming;
    try {
      const playlistResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=45&playlistId=${playlistId}&key=${apiKey}`
      );

      if (!playlistResponse.ok) {
        throw new Error("Failed to fetch videos from the playlist");
      }

      const playlistData = await playlistResponse.json();
      const playlistVideos = playlistData.items.map((item) => ({
        id: item.snippet.resourceId.videoId,
        snippet: item.snippet,
      }));

      const sortedVideos = playlistVideos.sort((a, b) => {
        const dateA = new Date(a.snippet.publishedAt);
        const dateB = new Date(b.snippet.publishedAt);
        return dateB.getTime() - dateA.getTime();
      });

      videos = sortedVideos.reverse();
    } catch (error) {
      error = error;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    return (
      <PodcastContent
        liveStreaming={isLiveStraming}
        liveVideoId={liveVideoId}
        videos={videos}
      />
    );
  } catch (error) {
    console.log(error);
    console.error("Error fetching or processing data:", error.message);
    error = "Error fetching or processing data. Please try again later.";
  }
};

export default Podcast;
