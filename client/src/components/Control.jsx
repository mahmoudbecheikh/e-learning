import React from "react";
import {
  Box,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";
import {
  FaPause,
  FaPlay,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
} from "react-icons/fa";
import "./control.css";

const Control = ({
  onPlayPause,
  playing,
  played,
  onSeek,
  onSeekMouseUp,
  volume,
  onVolumeChange,
  onMute,
  muted,
  onExpand,
  currentTime,
  duration,
  controlRef,
}) => {
  return (
    <Box className="control_Container" ref={controlRef} position="relative">
      <Box display="flex" alignItems="center" justifyContent="center">
        <IconButton
          aria-label="Play/Pause"
          icon={playing ? <FaPause /> : <FaPlay />}
          mx={4}
          onClick={onPlayPause}
        />
      </Box>

      

      <Box className="bottom__container">
        <Box className="slider__container">
          <Slider
            aria-label="time-slider"
            value={played * 100}
            onChange={onSeek}
            onChangeEnd={onSeekMouseUp}
            width="100%"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>

        <Text className="time-display">
          {currentTime} / {duration}
        </Text>

        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="Mute/Unmute"
            icon={muted ? <FaVolumeMute /> : <FaVolumeUp />}
            onClick={onMute}
          />
          <Slider
            aria-label="volume-slider"
            value={volume * 100}
            onChange={onVolumeChange}
            width="150px"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>


        </Box>
      </Box>
    </Box>
  );
};

export default Control;
