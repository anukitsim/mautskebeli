"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import CustomYoutubePlayer from "../components/CustomYoutube";
import VideoCard from "../components/VideoCard";
import Image from "next/image";

const Page = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalVideoCards, setTotalVideoCards] = useState(0);

  const videosPerPage = 17; // Number of videos to display per page

  // Move the set of videoIds outside the component function to make it persistent
  const videoIdsSet = new Set();

  const removeDuplicates = (videos) => {
    const uniqueVideos = [];

    videos.forEach((video) => {
      const videoId = video.id;

      // Check if the videoId is not already in the set
      if (!videoIdsSet.has(videoId)) {
        uniqueVideos.push(video);
        videoIdsSet.add(videoId);
      }
    });

    console.log("Video IDs Set:", videoIdsSet); // Log the videoIdsSet
    return uniqueVideos;
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `http://mautskebeli.local/wp-json/wp/v2/shroma?per_page=${videosPerPage}&page=${currentPage}`
      );

      if (!response.ok) {
        console.error("Error fetching data:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("Fetched Video Data:", data);

      if (totalPages === 0) {
        const totalPagesHeader = response.headers.get("x-wp-totalpages");
        if (totalPagesHeader) {
          setTotalPages(parseInt(totalPagesHeader, 10));
        }
      }

      const uniqueVideos = removeDuplicates(data);

      setVideos(uniqueVideos);

      // Increment the totalVideoCards count only when fetching new videos
      setTotalVideoCards((prevCount) => prevCount + uniqueVideos.length);
      console.log("Fetched Videos:", data);
      console.log("Unique Videos:", uniqueVideos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goToNextPage = () => {
    // Go to the next page only if there are more pages to fetch
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    // Go to the previous page only if not on the first page
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [currentPage, totalPages]); // Fetch again if currentPage or totalPages is updated



  return (
    <div>
      <Header />
      <Navigation />
      {videos.length > 0 && (
        <div>
          {/* Render the main video */}
          <CustomYoutubePlayer
            videoId={videos[0]?.acf.video_url.split("v=")[1]}
            style={{ width: "100%", maxWidth: "1180px", margin: "0 auto" }}
          />
          <h2 className="w-10/12 mx-auto p-10 z-999 text-[#000] text-[32px] font-bold">
            {videos[0]?.title.rendered}
          </h2>
          <p className="w-10/12 mx-auto p-10 z-999 text-[#A1A1A1] font-bold">
            {videos[0]?.acf.description}
          </p>
          <div className="w-10/12 mx-auto justify-end flex flex-row gap-5 p-10">
            <button onClick={goToPrevPage}>
                <Image
                src='/images/arrow-left-black.png' 
                alt='navigation'
                width={32}
                height={32}
                 />
            </button>
            <button onClick={goToNextPage}>
            <Image
                src='/images/arrow-right-black.png' 
                alt='navigation'
                width={32}
                height={32}
                 />
            </button>
          </div>
          {/* Render video cards */}
          <div className="w-10/12 mx-auto flex flex-wrap justify-center gap-8">
          
            {videos.slice(1).map((video, index) => {
              const key = `${video.id}-${index}`;
              return (
                <div key={key} className="w-[280px] mx-auto mb-8">
                  <VideoCard
                    videoId={video.acf.video_url.split("v=")[1]}
                    caption={video.title.rendered}
                  />
                </div>
              );
            })}
          </div>

         
         
        </div>
      )}
      {videos.length === 0 && <p>Loading...</p>}
    </div>
  );
};

export default Page;
