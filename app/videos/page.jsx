"use client"

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import CustomYoutubePlayer from '../components/CustomYoutube';
import VideoCard from '../components/VideoCard';

const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalVideoCards, setTotalVideoCards] = useState(0);
  const [videosToShow, setVideosToShow] = useState(20);

  const videosPerPage = 20; // Number of videos to display per page

  const fetchVideos = async () => {
    try {
      let allVideos = [];

      // Fetch videos from all post types and all pages
      for (const postType of ['mecniereba', 'medicina', 'msoflio', 'saxli', 'kalaki', 'shroma', 'xelovneba']) {
        let page = 1;
        let totalPages = 1; // Set an initial value greater than 0

        while (page <= totalPages) {
          const response = await fetch(
            `http://mautskebeli.local/wp-json/wp/v2/${postType}?per_page=${videosPerPage}&page=${page}`
          );

          if (!response.ok) {
            console.error(`Error fetching data for ${postType}, page ${page}:`, response.statusText);
            break; // Exit the loop on error
          }

          const data = await response.json();
          totalPages = parseInt(response.headers.get('x-wp-totalpages'), 10);

          allVideos.push(...data);
          page++;
        }
      }

      // Update state with unique videos
      setVideos(removeDuplicates(allVideos));

      console.log('Fetched All Videos:', allVideos);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLoadMore = () => {
    setVideosToShow((prevCount) => prevCount + videosPerPage);
  };

  const extractVideoId = (videoUrl) => {
    const match = videoUrl.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return match ? match[1] : null;
  };

  const removeDuplicates = (videos) => {
    const videoIdsSet = new Set();
    const uniqueVideos = [];

    videos.forEach((video) => {
      const videoId = extractVideoId(video.acf.video_url);

      // Check if the videoId is not already in the set
      if (!videoIdsSet.has(videoId)) {
        uniqueVideos.push(video);
        videoIdsSet.add(videoId);
      }
    });

    console.log('Video IDs Set:', videoIdsSet);
    return uniqueVideos;
  };

  const handleVideoCardClick = (index) => {
    // Handle video card click as needed
  };

  useEffect(() => {
    fetchVideos();
  }, []); 

  return (
    <div>
      <Header />
      <Navigation />

      {videos.length > 0 && (
        <div>
          <div className="w-10/12 mx-auto flex flex-wrap justify-center gap-8">
            {videos.slice(0, videosToShow).map((video, index) => {
              const key = `${video.id}-${index}`;
              return (
                <div
                  key={key}
                  className="w-[280px] mx-auto mb-8"
                  onClick={() => handleVideoCardClick(index)}
                >
                  <VideoCard
                    videoId={extractVideoId(video.acf.video_url)}
                    caption={video.title.rendered}
                    // Add other props as needed
                  />
                </div>
              );
            })}
          </div>
          {videosToShow < videos.length && (
            <div className="w-10/12 mx-auto p-10 z-999 text-center">
              <button onClick={handleLoadMore}>მეტი..</button>
            </div>
          )}
        </div>
      )}

      {videos.length === 0 && <p>Loading...</p>}
    </div>
  );
};

export default AllVideos;