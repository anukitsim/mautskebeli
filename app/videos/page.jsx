"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import VideoCard from "../components/VideoCard";
import Image from "next/image";
import Modal from 'react-modal';  // Import the Modal component
import CustomYoutubePlayer from "../components/CustomYoutube";

const Page = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalVideoCards, setTotalVideoCards] = useState(0);

  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [lastSelectedVideoIndex, setLastSelectedVideoIndex] = useState(0);

  const [currentVideoTitle, setCurrentVideoTitle] = useState("");
  const [currentVideoDescription, setCurrentVideoDescription] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);  // State for modal visibility

  const videosPerPage = 100;

  const postTypes = ["mecniereba", "medicina", "msoflio", "saxli", "kalaki", "shroma", "xelovneba"];

  const extractVideoId = (videoUrl) => {
    const match = videoUrl.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return match ? match[1] : null;
  };

  const removeDuplicates = (videos) => {
    const videoIdsSet = new Set();
    const uniqueVideos = [];

    videos.forEach((video) => {
      const videoId = extractVideoId(video.acf.video_url);

      if (!videoIdsSet.has(videoId)) {
        uniqueVideos.push(video);
        videoIdsSet.add(videoId);
      }
    });

    console.log("Video IDs Set:", videoIdsSet);
    return uniqueVideos;
  };

  const fetchVideos = async () => {
    try {
      const promises = postTypes.map(async (postType) => {
        const response = await fetch(
          `http://mautskebeli.local/wp-json/wp/v2/${postType}?per_page=${videosPerPage}&page=${currentPage}`
        );

        if (!response.ok) {
          console.error(`Error fetching data for ${postType}:`, response.statusText);
          return [];
        }

        const data = await response.json();
        console.log(`Fetched Video Data for ${postType}:`, data);

        return removeDuplicates(data);
      });

      const results = await Promise.all(promises);
      const allVideos = results.reduce((acc, videos) => acc.concat(videos), []);

      console.log("All Fetched Videos:", allVideos);

      setTotalVideoCards((prevCount) => prevCount + allVideos.length);
      setVideos(allVideos);

      if (totalPages === 0) {
        const totalPagesHeader = response.headers.get("x-wp-totalpages");
        if (totalPagesHeader) {
          setTotalPages(parseInt(totalPagesHeader, 10));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [currentPage, totalPages]);

  // Function to open the modal and set the selected video index
  const openModal = (index) => {
    setSelectedVideoIndex(index);
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setLastSelectedVideoIndex(selectedVideoIndex);
  };

  return (
    <div>
      <Header />
      <Navigation />
      {videos.length > 0 && (
        <div>
          <div className="w-10/12 mx-auto flex flex-wrap justify-center gap-8">
            {videos.map((video, index) => {
              const key = `${video.id}-${index}`;
              return (
                <div
                  key={key}
                  className="w-[280px] mx-auto mb-8"
                  onClick={() => openModal(index)}  // Open modal on click
                >
                  <VideoCard
                    videoId={extractVideoId(video.acf.video_url)}
                    thumbnailUrl={video.acf.thumbnail_url}
                    caption={video.title.rendered}
                  />
                </div>
              );
            })}
          </div>

          {/* Modal component */}
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
          >
            {/* Your modal content goes here */}
            <button onClick={closeModal} className='absolute left-5 top-[20%]'>
              <Image src='/images/cross.svg' alt='close' width={70} height={70} />
            </button>
            <div className='h-full overflow-hidden'>
              {/* Include your CustomYoutubePlayer component with the relevant videoId */}
              <CustomYoutubePlayer videoId={extractVideoId(videos[selectedVideoIndex]?.acf.video_url)} />
            </div>
          </Modal>
        </div>
      )}
      {videos.length === 0 && <p>Loading...</p>}
    </div>
  );
};

export default Page;
