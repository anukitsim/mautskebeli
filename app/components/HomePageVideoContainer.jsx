"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import CustomYoutubePlayer from './CustomYoutube';

const PlayButton = () => (
  <img src='/images/playbuttontest.svg' alt='playbutton' width={70} height={70} />
);

const VideoPlayer = ({ videoId, caption, onClose, style, customOverlayStyle }) => {
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
        width: '280px',
        borderRadius: '10px',
        border: '1px solid #000',
        backgroundColor: '#8C74B2',
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
            zIndex: 100,
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
        <div className='h-full w-full overflow-hidden'>
        <CustomYoutubePlayer videoId={videoId}  customOverlayStyle={{ height: "35%", top: "62%" }} />
        </div>
      </Modal>
    </div>
  );
};



const HomePageVideoContainer = () => {
 
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
      <Link href='/videos' className='mt-[150px] w-10/12 mx-auto flex justify-end mb-[16px] cursor-pointer font-medium text-[14px]'>
        ყველას ნახვა
      </Link>
      <div className='w-11/12 mx-auto flex flex-row justify-center gap-8'>
        {videos.map((video, index) => (
          <VideoPlayer key={index} videoId={video.videoId} caption={video.caption} onClose={() => console.log('Modal closed')} />
        ))}
      </div>
    </>
  );
};

export default HomePageVideoContainer;

