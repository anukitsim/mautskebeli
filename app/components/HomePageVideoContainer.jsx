"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';

const PlayButton = () => (
  <img src='/images/playButton.svg' alt='playbutton' width={70} height={70} />
);

const VideoPlayer = ({ videoId, caption }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

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
          top: '15%',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        },
        content: {
           
            
            border: 'none', // Remove border
            background: 'none', // Remove background
           
          
          },
      }}
    >
         <button onClick={closeModal} className='absolute left-5 -bottom-10'>
        <Image src='/images/cross.svg' alt='close' width={70} height={70} />
      </button>
       
      <div className='h-full overflow-hidden'>
     
        <iframe
          title="YouTube Video"
          width="100%"
          height="100%"
          rel='0'
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
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
          <VideoPlayer key={index} videoId={video.videoId} caption={video.caption} />
        ))}
      </div>
    </>
  );
};

export default HomePageVideoContainer;
