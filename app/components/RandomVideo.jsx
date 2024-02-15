"use client"
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import CustomYoutubePlayer from './CustomYoutube';



const PlayButton = () => (
    <img src='/images/playbuttontest.svg' alt='playbutton' width={40} height={40} />
  );
  
  const VideoPlayer = ({ videoId, caption }) => {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
    return (
      <div className='relative overflow-hidden mb-8 md:mb-0 md:w-1/4 lg:w-1/4 xl:w-1/4'>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className='w-full h-28 object-cover rounded-lg cursor-pointer'
        >
          <img
            src={thumbnailUrl}
            alt="Video Thumbnail"
            className='w-full h-full object-cover rounded-lg cursor-pointer'
          />
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer'>
            <PlayButton />
          </div>
        </a>
  
        <p className='mt-2 text-center'>{caption}</p>
      </div>
    );
  };
  


const RandomVideo = () => {
 
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Check if videos are already cached
        const cachedVideos = localStorage.getItem('cachedVideos');
        if (cachedVideos) {
          setVideos(JSON.parse(cachedVideos));
          return;
        }

        // If not cached, fetch the videos from the API
        const apiKey = 'AIzaSyDd4yHryI5WLPLNjpKsiuU1bYHnBgcK_u8'; // Replace with your YouTube API key
        const channelId = 'UC6TjRdvXOknZBbtXiePp1HA';
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=4`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch videos. Status: ${response.status}`);
        }

        const data = await response.json();
        const fetchedVideos = data.items.map((item) => ({
          videoId: item.id.videoId,
          caption: item.snippet.title,
        }));

        // Cache the fetched videos
        localStorage.setItem('cachedVideos', JSON.stringify(fetchedVideos));
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return  (
    <>
    
      <div className='w-9/12 mx-auto flex flex-row justify-end gap-5'>
        {videos.map((video, index) => (
          <VideoPlayer key={index} videoId={video.videoId} onClose={() => console.log('Modal closed')} />
        ))}
      </div>
    </>
  );
};

export default RandomVideo;

