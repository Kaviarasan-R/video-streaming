/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import VideoPlayer from "./VideoPlayer";
import { useRef } from "react";
import CustomPlayer from "./CustomPlayer";

function App() {
  const playerRef = useRef(null);
  const videoLink =
    "http://localhost:8000/uploads/courses/c4b1cf32-59f1-4ea7-83b2-ed9be4f6d93a/index.m3u8";

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL",
      },
    ],
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };
  return (
    <>
      <div>
        <h1>Video player</h1>
      </div>
      <VideoPlayer options={videoPlayerOptions} onReady={handlePlayerReady} />
      {/* <CustomPlayer /> */}
    </>
  );
}

export default App;
