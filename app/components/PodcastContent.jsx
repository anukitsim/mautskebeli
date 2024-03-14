"use client"

import React, { useEffect, useState, useRef } from 'react';
import CustomYoutubePlayer from './CustomYoutube';
import VideoCard from './VideoCard';

const PodcastContent = ({videos,liveStreaming,liveVideoId}) => {
  const [selectedVideoId, setSelectedVideoId] = useState('');
  const [customPlayerKey, setCustomPlayerKey] = useState(0);

  const mainVideoRef = useRef(null);

  const handleVideoCardClick = (videoId) => {
    setSelectedVideoId(videoId);
    setCustomPlayerKey((prevKey) => prevKey + 1);
  };

  useEffect(()=>{
    if(liveStreaming){
      setSelectedVideoId(liveVideoId)
    }

  },[liveStreaming])

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '3', paddingLeft: '20px' }}>
        {videos.length > 0 && (
          <>
            {liveStreaming && (
              <h1 className='text-3xl text-red-500 font-bold mb-4 mt-2'>LIVE STREAM</h1>
            )}
            <CustomYoutubePlayer
              ref={mainVideoRef}
              key={customPlayerKey}
              videoId={liveStreaming ? liveVideoId : selectedVideoId || videos.slice(-1)[0].id}
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
              onSelect={handleVideoCardClick}
              isSelected={video.id === selectedVideoId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastContent;
