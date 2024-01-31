"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import CustomYoutubePlayer from './CustomYoutube';
const PlayButton = () => (
  <img src='/images/playButton.svg' alt='playbutton' width={70} height={70} />
);

const VideoPlayer = ({ videoId, caption, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    onClose(); // Call the onClose prop to handle modal closing in the parent component
  };

 
  
  

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handleOverlayClick = (e) => {
    const targetClassList = e.target.classList;
  
    // Check if the clicked element is not a descendant of the v-vlite v-paused div
    if (!targetClassList.contains('v-vlite') && !targetClassList.contains('v-paused')) {
      closeModal();
    }
  };
  

  return (
    <div
      style={{
        position: 'relative',
        width: '380px',
        borderRadius: '10px',
        border: '1px solid #000',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <img
        src={thumbnailUrl}
        alt="Video Thumbnail"
        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
        }}
        onClick={openModal}
      >
        <PlayButton />
      </div>
      <p style={{ margin: '8px 10px 0', fontSize: '14px', fontWeight: 'bold' }}>
        {caption}
      </p>

      <Modal
       
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          },
          content: {
            border: 'none',
            background: 'none', 
          },
        }}
        onClick={handleOverlayClick}

      >
        <button onClick={closeModal} className='absolute left-5 top-[20%]'>
          <Image src='/images/cross.svg' alt='close' width={70} height={70} />
        </button>
        <div className='h-full overflow-hidden'>
          <CustomYoutubePlayer videoId={videoId} />
        </div>
      </Modal>
    </div>
  );
};



const HomePageVideoContainer = () => {
  const videos = [
    { videoId: 'QtCmYOqRUf0', caption: 'Caption 1' },
    { videoId: 'pfRDu6LrwPY', caption: 'Caption 2' },
    { videoId: 'XFvbTUtScw8', caption: 'Caption 3' },
    { videoId: 'DlE9WziQL0g', caption: 'Caption 4' },
  ];

  return (
    <>
      <Link
        href="#"
        className="mt-[150px] w-11/12 mx-auto flex justify-end mb-[16px] cursor-pointer font-medium text-[14px]"
      >
        ყველას ნახვა
      </Link>
      <div className="w-11/12 mx-auto flex flex-row justify-center gap-8">
        {videos.map((video, index) => (
          <VideoPlayer
            key={index}
            videoId={video.videoId}
            caption={video.caption}
            onClose={() => console.log('Modal closed')} // You can handle modal closing here
          />
        ))}
      </div>
    </>
  );
};

export default HomePageVideoContainer;
