"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomYoutubePlayer({ videoId, onClose }) {
  const playerRef = useRef(null);
  const volumeControlRef = useRef(null);

  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);

  let interval;

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }

  useEffect(() => {
    const loadPlayer = () => {
      const newPlayer = new window.YT.Player(playerRef.current, {
        videoId: videoId,
        playerVars: {
          controls: 0,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }
          },
          onReady: (event) => {
            setPlayer(event.target);
            setDuration(event.target.getDuration());
            event.target.unMute();
            if (
              event.target.getPlayerState() !== window.YT.PlayerState.PLAYING
            ) {
              event.target.playVideo();
            }
          },
        },
      });

      setPlayer(newPlayer);
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = loadPlayer;
    } else {
      loadPlayer();
    }

    return () => {
      if (player) {
        player.stopVideo(); // Stop the video before unmounting
      }
      clearInterval(interval);
      window.onYouTubeIframeAPIReady = null;
    };
  }, [videoId]);

  useEffect(() => {
    if (player && typeof player.getCurrentTime === "function") {
      const interval = setInterval(() => {
        const currentTime = player.getCurrentTime();
        setCurrentTime(currentTime);
        const newProgress = (currentTime / duration) * 100;
        setProgress(newProgress);

        const isPaused = player.getPlayerState() === window.YT.PlayerState.PAUSED;
        const posterElement = document.querySelector(".v-poster");

        if (posterElement) {
          posterElement.style.display = isPaused ? "block" : "none";
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [player, duration]);

  const togglePlayPause = () => {
    if (player && typeof player.getPlayerState === "function") {
      const playerState = player.getPlayerState();

      if (playerState === window.YT.PlayerState.PLAYING) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  const handleFullscreenToggle = () => {
    const videoContainer = document.querySelector(".video-container");

    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
    }
  };

  const handleVideoOverlayClick = () => {
    togglePlayPause();
  };

  const handleSeek = (e) => {
    const seekToTime = (e.target.value / 100) * duration;

    if (player && typeof player.seekTo === "function") {
      player.seekTo(seekToTime, true);
    }

    setCurrentTime(seekToTime);

    const newProgress = (seekToTime / duration) * 100;
    setProgress(newProgress);

    updateSliderThumbWidth(newProgress);
  };

  const updateSliderThumbWidth = (progress) => {
    const rangeInput = volumeControlRef.current;
    const thumb =
      rangeInput && rangeInput.querySelector("::-webkit-slider-thumb");

    if (thumb) {
      // Calculate the new width of the thumb
      const thumbWidth = 50 + progress * 0.5; // Adjust the multiplier as needed

      // Apply the new width to the thumb
      thumb.style.width = `${thumbWidth}px`;
    }
  };

  const handleOverlayClick = (e) => {
    const targetClassList = e.target.classList;

    if (
      !targetClassList.contains("v-vlite") &&
      !targetClassList.contains("v-paused")
    ) {
      onClose();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
  
    if (player && typeof player.setVolume === "function") {
      player.setVolume(newVolume);
    }
  
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  


  const toggleMute = () => {
  if (
    player &&
    typeof player.isMuted === "function" &&
    typeof player.unMute === "function"
  ) {
    if (isMuted) {
      // Unmute and set volume to the previous non-zero volume
      const previousVolume = volume === 0 ? 50 : volume;
      player.unMute();
      player.setVolume(previousVolume);
      setVolume(previousVolume);
    } else {
      // Mute and set volume to 0
      player.mute();
      setVolume(0);
    }
    setIsMuted(!isMuted);
  }
};


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="video-container js-media-container js-video-container">
        <div className="v-vlite v-paused" tabIndex="0">
          <div
            ref={playerRef}
            className="vlite-js js-yt-player rounded-lg"
            data-youtube-id={videoId}
            onClick={handleOverlayClick}
          ></div>
          <div
            className="v-overlayVideo"
            data-v-toggle-play-pause=""
            onClick={handleVideoOverlayClick}
          >
           <div
              className="v-poster"
              data-v-toggle-play-pause=""
              style={{
                backgroundImage:
                  "https://img.youtube.com/vi/qUYkBG488B0/maxresdefault.jpg",
              }}
            ></div>
          </div>
          <div className="v-loader">
            <div className="v-loaderContent">
              <div className="v-loaderBounce1"></div>
              <div className="v-loaderBounce2"></div>
              <div className="v-loaderBounce3"></div>
            </div>
          </div>

          {!isPlaying && (
            <div
              className="v-bigPlayButton"
              data-v-toggle-play-pause=""
              onClick={handleVideoOverlayClick}
            >
              <span className="v-playerIcon v-iconBigPlay">
                <img
                  src="/images/playbuttontest.svg"
                  alt="playbutton"
                  width={500}
                  height={500}
                />
              </span>
            </div>
          )}

          <div className="v-controlBar">
            <div className="v-progressBar">
              <div
                className="v-progressSeek"
                style={{ width: `${progress}%` }}
              ></div>
              <input
                type="range"
                className="v-progressInput"
                min="0"
                max="100"
                step="0.01"
                value={progress}
                onChange={handleSeek}
                onMouseDown={() => clearInterval(interval)}
                orient="horizontal"
              />
            </div>
            <div className="v-controlBarContent">
              <div
                className="v-playPauseButton"
                data-v-toggle-play-pause=""
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <span className="v-playerIcon v-iconPause">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                      <path d="M4 4h10v24H4zm14 0h10v24H18z"></path>
                    </svg>
                  </span>
                ) : (
                  <span className="v-playerIcon v-iconPlay">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                      <path d="M6 4l20 12L6 28z"></path>
                    </svg>
                  </span>
                )}
              </div>
              <div className="v-time">
                <span className="v-currentTime">{formatTime(currentTime)}</span>
                &nbsp;/&nbsp;
                <span className="v-duration">{formatTime(duration)}</span>
              </div>
              <div className="v-volume">
                <span
                  className={`v-playerIcon ${
                    isMuted ? "v-iconVolumeMute" : "v-iconVolumeHigh"
                  }`}
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                      <path d="M13 30a1 1 0 0 1-.707-.293L4.586 22H1a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h3.586l7.707-7.707A1 1 0 0 1 14 3v26a1.002 1.002 0 0 1-1 1z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 32">
                      <path d="M27.814 28.814a1.5 1.5 0 0 1-1.061-2.56C29.492 23.515 31 19.874 31 16.001s-1.508-7.514-4.247-10.253a1.5 1.5 0 1 1 2.121-2.121C32.179 6.932 34 11.327 34 16.001s-1.82 9.069-5.126 12.374a1.495 1.495 0 0 1-1.061.439zm-5.329-2.829a1.5 1.5 0 0 1-1.061-2.56c4.094-4.094 4.094-10.755 0-14.849a1.5 1.5 0 1 1 2.121-2.121c2.55 2.55 3.954 5.94 3.954 9.546s-1.404 6.996-3.954 9.546a1.495 1.495 0 0 1-1.061.439zm-5.328-2.828a1.5 1.5 0 0 1-1.061-2.56 6.508 6.508 0 0 0 0-9.192 1.5 1.5 0 1 1 2.121-2.121c3.704 3.704 3.704 9.731 0 13.435a1.495 1.495 0 0 1-1.061.439zM13 30a1 1 0 0 1-.707-.293L4.586 22H1a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h3.586l7.707-7.707A1 1 0 0 1 14 3v26a1.002 1.002 0 0 1-1 1z"></path>
                    </svg>
                  )}
                </span>
                <input
                  ref={volumeControlRef}
                  type="range"
                  className="v-volumeInput"
                  min="0"
                  max="100"
                  step="1"
                  value={volume}
                  onChange={handleVolumeChange}
                  orient="horizontal"
                />
              </div>

              <div className="v-fullscreen " onClick={handleFullscreenToggle}>
                <span className="v-playerIcon v-iconFullscreen">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M27.414 24.586L22.828 20 20 22.828l4.586 4.586L20 32h12V20zM12 0H0v12l4.586-4.586 4.543 4.539 2.828-2.828-4.543-4.539zm0 22.828L9.172 20l-4.586 4.586L0 20v12h12l-4.586-4.586zM32 0H20l4.586 4.586-4.543 4.539 2.828 2.828 4.543-4.539L32 12z"></path>
                  </svg>
                </span>
                <span className="v-playerIcon v-iconShrink">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M24.586 27.414L29.172 32 32 29.172l-4.586-4.586L32 20H20v12zM0 12h12V0L7.414 4.586 2.875.043.047 2.871l4.539 4.543zm0 17.172L2.828 32l4.586-4.586L12 32V20H0l4.586 4.586zM20 12h12l-4.586-4.586 4.547-4.543L29.133.043l-4.547 4.543L20 0z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
