// VideoCard.jsx

"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const PlayButton = () => (
  <img src='/images/playbuttontest.svg' alt='playbutton' width={70} height={70} />
);

const VideoCard = ({ videoId, caption }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Remove any additional query parameters from videoId
  const sanitizedVideoId = videoId ? videoId.split('&')[0] : '';
  // Construct the thumbnail URL using the maxresdefault.jpg quality
  const thumbnailUrl = `https://img.youtube.com/vi/${sanitizedVideoId}/hqdefault.jpg`;



  

  return (
    <div
      style={{
        position: 'relative',
        width: '280px', 
        borderRadius: '10px',
        border: '3px solid #8C74B2',
        backgroundColor: '#D2D4DC',
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
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '50px',
          height: '50px'
        }}
        onClick={openModal}
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