"use client"
import Modal from 'react-modal';
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react';

import CustomYoutubePlayer from './CustomYoutube';

const PlayButton = ({ onClick }) => (
  <img
    src='/images/playbuttontest.svg'
    alt='playbutton'
    width={70}
    height={70}
    onClick={onClick} // Ensure onClick is passed down to the img element
    style={{ cursor: 'pointer' }} // Optional: Add cursor pointer for better UX
  />
);


const VideoCard = ({ videoId, caption, onSelect }) => {
  const sanitizedVideoId = videoId ? videoId.split('&')[0] : '';
  const thumbnailUrl = `https://img.youtube.com/vi/${sanitizedVideoId}/hqdefault.jpg`;

  return (
    <div
      className='flex flex-col p-[10px]'
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
      onClick={(e) => {
        e.stopPropagation(); // Correctly terminated statement
        onSelect(videoId); // Added missing semicolon
      }} // Correctly closed JSX block
    >
      <img
        src={thumbnailUrl}
        alt="Video Thumbnail"
        style={{ width: '260px', height: '142px', objectFit: 'cover', borderRadius: '10px' }}
        className='mt-[10px]'
      />
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '50px',
          height: '50px',
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent the modal click from propagating to the parent div
        }}
      >
        <PlayButton onClick={(e) => {
          e.stopPropagation(); // Prevent the card click from propagating to the parent div
          onSelect(videoId); // Ensure this call is correctly terminated
        }} />
      </div>
      <p className='mt-[8px]'>
        {caption}
      </p>
    </div>
  );
};




const HomePageVideoContainer = ({ videoId, onClose }) => {
  const [randomVideos, setRandomVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchRandomVideos = async () => {
    try {
      const postTypes = ['mecniereba', 'medicina', 'msoflio', 'saxli', 'kalaki', 'shroma', 'xelovneba'];
      const requests = postTypes.map((postType) =>
        fetch(`http://mautskebeli.local/wp-json/wp/v2/${postType}?per_page=4&orderby=date&order=desc`)
      );

      const responses = await Promise.all(requests);
      const allVideos = await Promise.all(
        responses.map(async (response) => {
          if (!response.ok) throw new Error(`Failed to fetch videos for ${response.url}`);
          return response.json();
        })
      ).then((videos) => videos.flat());

      // Sort and select videos
      const sortedVideos = allVideos.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
      setRandomVideos(sortedVideos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchRandomVideos();
  }, []);

  const handleVideoSelect = useCallback((videoId) => {
    setSelectedVideoId(videoId);
    setModalIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
    setSelectedVideoId(null);
    onClose?.(); // Optional chaining in case onClose is not provided
  }, [onClose]);

  const handleOverlayClick = useCallback((e) => {
    if (!e.target.classList.contains('v-vlite') && !e.target.classList.contains('v-paused')) {
      closeModal();
    }
  }, [closeModal]);

  const extractVideoId = (videoUrl) => {
    const match = videoUrl.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div className='w-11/12 mx-auto mt-10'>
      <div className="flex flex-wrap justify-center gap-8">
        {randomVideos.map((video, index) => (
          <div key={index} className="w-[280px] mx-auto mb-8">
            <VideoCard
              videoId={extractVideoId(video.acf.video_url)}
              caption={video.title.rendered}
              onSelect={() => handleVideoSelect(extractVideoId(video.acf.video_url))}
            />
          </div>
        ))}
      </div>
      {selectedVideoId && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Video Modal"
          style={{
            overlay: {
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
            <CustomYoutubePlayer videoId={selectedVideoId}   customOverlayStyle={{ height: "38%", top: "59%" }}/>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default HomePageVideoContainer;
