"use client"

import React, { useState } from 'react';

const PlayButton = ({ onClick }) => (
  <img
    src='/images/playbuttontest.svg'
    alt='play button'
    width={70}
    height={70}

  />
);

const VideoCard = ({ videoId, caption, onSelect }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const sanitizedVideoId = videoId ? videoId.split('&')[0] : '';
  const thumbnailUrl = `https://img.youtube.com/vi/${sanitizedVideoId}/hqdefault.jpg`;

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent the card click from propagating
    if (typeof onSelect === 'function') {
      onSelect(videoId);
    } else {
      console.error('onSelect prop is not provided or not a function');
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '280px', 
        height: '320px',
        borderRadius: '10px',
        border: '3px solid #8C74B2',
        background: 'linear-gradient(to bottom right, #E0DBE8, #D2D4DC)',
        overflow: 'hidden',
        zIndex: 1,
      }}
      className='flex flex-col p-[10px]'
    >
      <img
        src={thumbnailUrl}
        alt="Video Thumbnail"
        style={{ width: '260px', height: '142px', objectFit: 'cover',  borderRadius: '10px', }}
        className='mt-[10px]'
      />
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '70px', // Match PlayButton size for accurate click area
          height: '70px'
        }}
      >
   <PlayButton />
      </div>
      <p className='mt-[8px]'>
        {caption}
      </p>
    </div>
  );
};

export default VideoCard;
