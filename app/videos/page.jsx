"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import CustomYoutubePlayer from "../components/CustomYoutube";
import Modal from "react-modal";
import Image from "next/image";

const PlayButton = () => (
  <img src="/images/playbuttontest.svg" alt="playbutton" width={70} height={70} />
);

function decodeHtmlEntities(text) {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = text;
  return tempElement.textContent || tempElement.innerText;
}

// Function to extract YouTube video ID from a URL
function extractVideoId(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match && match[1] ? match[1] : null;
}


const VideoCard = ({ videoId, caption, onCardClick }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const apiKey = 'AIzaSyDd4yHryI5WLPLNjpKsiuU1bYHnBgcK_u8'; // Replace with your YouTube API key
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch video details. Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.items || data.items.length === 0) {
          throw new Error('Video not found or API response format changed.');
        }

        const maxResThumbnailUrl = data.items[0]?.snippet?.thumbnails?.maxres?.url;
        const highQualityThumbnailUrl = data.items[0]?.snippet?.thumbnails?.high?.url;

        // Choose the best available thumbnail URL
        const chosenThumbnailUrl = maxResThumbnailUrl || highQualityThumbnailUrl;

        if (!chosenThumbnailUrl) {
          throw new Error('No suitable thumbnails found in API response.');
        }

        setThumbnailUrl(chosenThumbnailUrl);
      } catch (error) {
        console.error('Error fetching video details:', error);
        // Handle error gracefully, e.g., set a default thumbnail URL or ignore
      }
    };

    fetchThumbnail();
  }, [videoId]);

  const validVideoId = videoId;
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
    onCardClick(validVideoId);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const decodedCaption = decodeHtmlEntities(caption);


  return (
    <div
      style={{
        position: 'relative',
        width: '480px',
        borderRadius: '10px',
        border: '1px solid #000',
        backgroundColor: '#8C74B2',
        overflow: 'hidden',
        zIndex: 1,
      }}
      className='flex flex-col p-[10px] hover:scale-125 mt-10'
    >
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt="Video Thumbnail"
          style={{ width: '600px', height: '402px', objectFit: 'cover', borderRadius: '10px' }}
          className='mt-[10px]'
        />
      )}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          width: '50px',
          height: '50px',
        }}
        onClick={openModal}
      >
        <PlayButton />
      </div>
     <p className='mt-[8px]'>{decodedCaption}</p>
    </div>
  );
};



const Videos = () => {
  const [videoData, setVideoData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if videoData is already cached
        const cachedData = localStorage.getItem('videoData');
        if (cachedData) {
          setVideoData(JSON.parse(cachedData));
          return;
        }
    
        const apiKey = 'AIzaSyDd4yHryI5WLPLNjpKsiuU1bYHnBgcK_u8';
        const channelId = 'UC6TjRdvXOknZBbtXiePp1HA';
        let nextPageToken = '';
        const allVideos = [];
    
        do {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=500&pageToken=${nextPageToken}`
          );
    
          if (!response.ok) {
            throw new Error(`Failed to fetch video data. Status: ${response.status}`);
          }
    
          const data = await response.json();
          const videos = data.items.map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            videourl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          }));
    
          allVideos.push(...videos);
          nextPageToken = data.nextPageToken;
    
        } while (nextPageToken);
    
        // Cache the fetched data
        localStorage.setItem('videoData', JSON.stringify(allVideos));
        setVideoData(allVideos);

        
    
        console.log("Video Data:", allVideos);
        console.log("Number of videos fetched:", allVideos.length);
    
      } catch (error) {
        console.error("Error fetching video data:", error);

        setThumbnailUrl(DEFAULT_THUMBNAIL_URL);
        
      }
    };
    
    
    fetchData();
  }, []);

  const handleCardClick = (videoId) => {
    setSelectedVideo(videoId);
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setSelectedVideo(null);
    setModalIsOpen(false);
  };

  return (
    <main>
      <Header />
      <Navigation />

      <section className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4">ყველა ვიდეო</h2>
        <div className="grid grid-cols-2 gap-16 mt-10">
        {videoData.map((video, index) => (
  <VideoCard
    key={`${video.id}-${index}`}
    videoId={extractVideoId(video.videourl)}
    caption={video.title}
    onCardClick={() => handleCardClick(extractVideoId(video.videourl))}
  />
))}

        </div>
      </section>

      {selectedVideo && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Video Modal"
          ariaHideApp={false}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            },
            content: {
              position: "fixed",
              border: "none",
              background: "none",
              width: "100%",
              height: "100%",
            },
          }}
          onClick={(e) => {
            // Prevent clicks inside the modal from closing it
            e.stopPropagation();
          }}
        >
          <button
            onClick={closeModal}
            className="absolute left-5 top-[20%]"
          >
            <Image src="/images/cross.svg" alt="close" width={70} height={70} />
          </button>
          <div className="h-full overflow-hidden">
            <CustomYoutubePlayer videoId={selectedVideo} />
          </div>
        </Modal>
      )}
    </main>
  );
};

export default Videos;
