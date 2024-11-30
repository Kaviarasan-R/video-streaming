import { useEffect, useRef, useState } from "react";
import "./CustomPlayer.css";

const CustomPlayer = () => {
  const videoLink =
    "http://localhost:8000/uploads/courses/c4b1cf32-59f1-4ea7-83b2-ed9be4f6d93a/index.m3u8";

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const updateCurrentTime = () => {
      if (video) {
        setCurrentTime(video.currentTime);
        setDuration(video.duration);
      }
    };

    video.addEventListener("timeupdate", updateCurrentTime);
    return () => {
      video.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    const video = videoRef.current;
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleFullscreen = () => {
    const videoContainer = videoRef.current.parentElement;
    if (!isFullscreen) {
      videoContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`video-container ${isPlaying ? "playing" : "paused"}`}
      data-volume-level={volume}
    >
      <img className="thumbnail-img" alt="Thumbnail" />
      <div className="video-controls-container">
        <div className="timeline-container">
          <div className="timeline">
            <img className="preview-img" alt="Preview" />
            <div className="thumb-indicator"></div>
          </div>
        </div>
        <div className="controls">
          <button className="play-pause-btn" onClick={togglePlay}>
            {isPlaying ? (
              <svg className="pause-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
              </svg>
            ) : (
              <svg className="play-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
            )}
          </button>
          <div className="volume-container">
            <button className="mute-btn" onClick={toggleMute}>
              {isMuted ? (
                <svg className="volume-muted-icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                  />
                </svg>
              ) : (
                <svg className="volume-high-icon" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                  />
                </svg>
              )}
            </button>
            <input
              className="volume-slider"
              type="range"
              min="0"
              max="1"
              step="any"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
          <div className="duration-container">
            <div className="current-time">
              {Math.floor(currentTime / 60)}:
              {String(Math.floor(currentTime % 60)).padStart(2, "0")}
            </div>
            /
            <div className="total-time">
              {duration
                ? `${Math.floor(duration / 60)}:${String(
                    Math.floor(duration % 60)
                  ).padStart(2, "0")}`
                : "0:00"}
            </div>
          </div>
          <button className="captions-btn">
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z"
              />
            </svg>
          </button>
          <button className="speed-btn wide-btn">1x</button>
          <button className="mini-player-btn">
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
              />
            </svg>
          </button>
          <button className="theater-btn">
            <svg className="tall" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
              />
            </svg>
            <svg className="wide" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8z"
              />
            </svg>
          </button>
          <button className="fullscreen-btn" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M6 19H5v-1h1v1zm2 0H8v-1h1v1zm2 0h-1v-1h1v1zm2 0h-1v-1h1v1zm2 0h-1v-1h1v1zm2 0h-1v-1h1v1zm1 0h-1v-1h1v1zm2 0h-1v-1h1v1zm0-4h1v1h-1v-1zm-1 0h-1v-1h1v1zm-2 0h-1v-1h1v1zm-2 0h-1v-1h1v1zm-2 0h-1v-1h1v1zm-2 0h-1v-1h1v1zm-2 0h-1v-1h1v1zm-2 0H5v-1h1v1zm8-6H5v-1h8v1zM5 5v1h8V5H5z"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M6 19h1v1H6zm2 0h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm2 0h1v1h-1zm-1 0h1v1h-1zm2 0h1v1h-1zm0-4h1v1h-1zm-1 0h-1v1h1zm-2 0h-1v1h1zm-2 0h-1v1h1zm-2 0h-1v1h1zm-2 0h-1v1h1zm-2 0h-1v1h1zm2-6h8v1H6zm0-4h8v1H6z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <video
        ref={videoRef}
        id="my-video"
        className="video-js"
        preload="auto"
        width="640"
        height="264"
        // poster="MY_VIDEO_POSTER.jpg"
        data-setup="{}"
      >
        <source src={videoLink} type="application/x-mpegURL" />
        <track kind="captions" srcLang="en" src="assets/subtitles.vtt"></track>
      </video>
    </div>
  );
};

export default CustomPlayer;
