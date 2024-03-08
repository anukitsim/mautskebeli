"use client"

import React, { useEffect, useState, useRef } from 'react';
import CustomYoutubePlayer from './CustomYoutube';
import VideoCard from './VideoCard';

const Podcast = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState('');
  const [isLive, setIsLive] = useState(false);
  const apiKey = 'AIzaSyDd4yHryI5WLPLNjpKsiuU1bYHnBgcK_u8';
  const playlistId = 'PL8wF1aEA4P8NJZUazilLH7ES-T-RQd3Cy';
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');
  const [currentVideoDescription, setCurrentVideoDescription] = useState('');
  const [lastSelectedVideoId, setLastSelectedVideoId] = useState('');
  const [customPlayerKey, setCustomPlayerKey] = useState(0);

  const mainVideoRef = useRef(null);

  const handleVideoCardClick = (videoId) => {
    setSelectedVideoId(videoId);
    setCustomPlayerKey((prevKey) => prevKey + 1);
  };

  const checkIfLiveStream = async () => {
    try {
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=YOUR_CHANNEL_ID&key=${apiKey}`
      );

      if (!channelResponse.ok) {
        throw new Error('Failed to fetch channel information');
      }

      const channelData = await channelResponse.json();
      const liveBroadcastContent = channelData.items[0]?.contentDetails?.relatedPlaylists?.live;

      return liveBroadcastContent === 'live';
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        const liveStatus = await checkIfLiveStream();
        setIsLive(liveStatus);
      } catch (error) {
        console.error(error);
      }
    };

    // Check live status every 60 seconds (adjust as needed).
    const intervalId = setInterval(checkLiveStatus, 60000);

    // Perform initial check.
    checkLiveStatus();

    return () => clearInterval(intervalId); // Clear interval on component unmount.
  }, [apiKey]);

  useEffect(() => {
    if (selectedVideoId !== lastSelectedVideoId) {
      const selectedVideo = videos.find((video) => video.id === selectedVideoId);
      setCurrentVideoTitle(selectedVideo?.snippet.title || '');
      setCurrentVideoDescription(selectedVideo?.snippet.description || '');
      setLastSelectedVideoId(selectedVideoId);
    }
  }, [selectedVideoId, lastSelectedVideoId, videos]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const playlistResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=45&playlistId=${playlistId}&key=${apiKey}`
        );

        if (!playlistResponse.ok) {
          throw new Error('Failed to fetch videos from the playlist');
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

        setVideos(sortedVideos.reverse());
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, [apiKey, playlistId]);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '3', paddingLeft: '20px' }}>
        {videos.length > 0 && (
          <>
            {isLive && (
              <h1 className='text-3xl text-red-500 font-bold mb-4'>LIVE STREAM</h1>
            )}
            <CustomYoutubePlayer
              ref={mainVideoRef}
              key={customPlayerKey}
              videoId={isLive ? 'LIVE_STREAM_VIDEO_ID' : selectedVideoId || videos.slice(-1)[0].id}
              onClose={() => setSelectedVideoId('')}
              videoData={videos.find((video) => video.id === selectedVideoId)}
              style={{ width: '100%', height: '500px' }}
              customOverlayStyle={{ height: "35%", top: "65%" }}
            />
          </>
        )}
      </div>
      <h1 className='pt-20 pr-5'>არქივი</h1>
      <div style={{ flex: '1', maxHeight: '640px', overflowY: 'auto', position: 'sticky', top: '0' }} className='mt-20 rounded-lg flex flex-col items-center mr-5 p-5  '>
        <div className='flex flex-col gap-5'>
          {videos.map((video, index) => (
            <VideoCard
              key={video.id || index}
              videoId={video.id}
              caption={video.snippet.title}
              onClick={handleVideoCardClick}
              isSelected={video.id === selectedVideoId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Podcast;
