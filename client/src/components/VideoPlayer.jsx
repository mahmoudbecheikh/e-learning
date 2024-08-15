import React, { useState, useRef, useEffect } from "react";
import "./video.css";
import ReactPlayer from "react-player";
import { Box, Spinner } from "@chakra-ui/react";
import Control from "./Control";

function VideoPlayer({ url, onVideoEnd }) {
  const formatTime = (time) => {
    if (isNaN(time)) {
      return "00:00";
    }

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
    buffer: false,
    ended: false,
  });

  const [controlsVisible, setControlsVisible] = useState(true);
  const controlRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const hideControlsTimeout = useRef(null);

  const { playing, muted, volume, played, seeking, buffer, ended } = videoState;

  const handleMouseMove = () => {
    setControlsVisible(true);
    clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(hideControlsTimeout.current);
    };
  }, []);

  const handlePlayPause = () => {
    setVideoState((prevState) => ({
      ...prevState,
      playing: !prevState.playing,
    }));
  };

  const handleMute = () => {
    setVideoState((prevState) => ({
      ...prevState,
      muted: !prevState.muted,
    }));
  };

  const handleVolumeChange = (value) => {
    const newVolume = parseFloat(value) / 100;
    setVideoState((prevState) => ({
      ...prevState,
      volume: newVolume,
      muted: newVolume === 0,
    }));
  };

  const handleSeekChange = (value) => {
    const newPlayed = parseFloat(value) / 100;
    const currentPlayed = videoPlayerRef.current
      ? videoPlayerRef.current.getCurrentTime() / videoPlayerRef.current.getDuration()
      : 0;

    if (newPlayed < currentPlayed) {
      setVideoState((prevState) => ({
        ...prevState,
        played: newPlayed,
        seeking: true,
      }));
    }
  };

  const handleSeekMouseDown = () => {
    setVideoState((prevState) => ({
      ...prevState,
      seeking: true,
    }));
  };

  const handleSeekMouseUp = (value) => {
    const newPlayed = parseFloat(value) / 100;
    const currentPlayed = videoPlayerRef.current
      ? videoPlayerRef.current.getCurrentTime() / videoPlayerRef.current.getDuration()
      : 0;

    if (newPlayed < currentPlayed) {
      videoPlayerRef.current.seekTo(newPlayed);
      setVideoState((prevState) => ({
        ...prevState,
        seeking: false,
      }));
    }
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setVideoState((prevState) => ({
        ...prevState,
        played: state.played,
      }));
    }
  };

  const handleEnded = () => {
    setVideoState((prevState) => ({
      ...prevState,
      playing: false,
      ended: true,
    }));
    if (onVideoEnd) {
      onVideoEnd(true);
    }
  };

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : 0;
  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : 0;

  return (
    <Box
      className="video_container"
      onMouseMove={handleMouseMove}
      position="relative"
      width="60%"
      height="60%"
      margin="50px auto"
    >
      <div className="player__wrapper">
        <ReactPlayer
          ref={videoPlayerRef}
          className="player"
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          muted={muted}
          volume={volume}
          onProgress={handleProgress}
          onBuffer={() =>
            setVideoState((prevState) => ({ ...prevState, buffer: true }))
          }
          onBufferEnd={() =>
            setVideoState((prevState) => ({ ...prevState, buffer: false }))
          }
          onEnded={handleEnded}
        />
        {buffer && (
          <Spinner
            size="lg"
            color="white"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          />
        )}
        <div
          className={`control__wrapper ${
            controlsVisible ? "" : "hide"
          }`}
          ref={controlRef}
        >
          <Control
            onPlayPause={handlePlayPause}
            playing={playing}
            played={played}
            onSeek={handleSeekChange}
            onSeekMouseDown={handleSeekMouseDown}
            onSeekMouseUp={handleSeekMouseUp}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            muted={muted}
            onMute={handleMute}
            duration={formatTime(duration)}
            currentTime={formatTime(currentTime)}
            buffer={buffer}
          />
        </div>
      </div>
    </Box>
  );
}

export default VideoPlayer;
