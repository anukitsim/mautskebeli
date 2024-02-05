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

// Function to extract YouTube video ID from a URL
function extractVideoId(url) {
  const match = url.match(/[?&]v=([^&]+)/);
  return match && match[1] ? match[1] : null;
}

// VideoCard component for rendering individual video cards
const VideoCard = ({ videoId, caption, onCardClick }) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    onClose(); // Call the onClose prop to handle modal closing in the parent component
  };

  const handleOverlayClick = (e) => {
    const targetClassList = e.target.classList;

    // Check if the clicked element is not a descendant of the v-vlite v-paused div
    if (
      !targetClassList.contains("v-vlite") &&
      !targetClassList.contains("v-paused")
    ) {
      closeModal();
    }
  };

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
      <img
        src={thumbnailUrl}
        alt="Video Thumbnail"
        style={{ width: '600px', height: '402px', objectFit: 'cover',  borderRadius: '10px', }}
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

const Videos = () => {
  const [videoData, setVideoData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://mautskebeli.local/wp-json/wp/v2/video/?acf_format=standard&_fields=id%2Ctitle%2Cacf"
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch video data. Status: ${response.status}`
          );
        }

        const data = await response.json();
        setVideoData(data);

        console.log("Video Data:", data); // Log the video data to check for valid URLs
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  return (
    <main>
      <Header />
      <Navigation />

      <section className="container  mx-auto ">
        <h2 className="text-3xl font-bold mb-4">ყველა ვიდეო</h2>
        <div className="grid grid-cols-2 gap-16 mt-10">
          {videoData.map((video) => (
            <VideoCard
              key={video.id}
              videoId={extractVideoId(video.acf.videourl)}
              caption={video.title.rendered}
              onCardClick={() =>
                handleCardClick(extractVideoId(video.acf.videourl))
              }
            />
          ))}
        </div>
      </section>

      {selectedVideo && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedVideo(null)}
          contentLabel="Video Modal"
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
            onClick={() => setSelectedVideo(null)}
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
