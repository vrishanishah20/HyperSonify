"use client";

import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import {
  Dispatch,
  MouseEventHandler,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { selectClasses } from "@mui/material";

type Props = {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  onPlay: () => void;
  onPause: () => void;
  onScrub: (val: number) => void;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  selectedImage?: number;
};

const DURATION = 20 * 1000; // ms
const FRAMES = 785;
const TICK_DELAY = DURATION / FRAMES;

const Player = ({
  value,
  selectedImage,
  setValue,
  onPlay,
  onPause,
  onScrub,
  audioRef,
}: Props) => {
  const [isPaused, setPaused] = useState(true);
  const intervalIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isPaused) {
      onPause();
    } else {
      onPlay();
    }

    if (!isPaused) {
      intervalIdRef.current = setInterval(() => {
        setValue((v) => (v as number) + 100 / FRAMES);
      }, TICK_DELAY);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isPaused]);

  useEffect(() => {
    if (!isPaused) {
      if (audioRef.current) {
        audioRef.current.currentTime = (value / 100) * 20;
      }
      audioRef.current?.play();
    }
  }, [selectedImage]);
  const onPlayButtonClick = () => {
    if (isPaused && value >= 99) {
      setValue(0);
    }
    setPaused(!isPaused);
  };
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ mb: 1 }}
      alignItems="center"
      onKeyUp={(e) => {
        if (e.key === " ") onPlayButtonClick();
        e.preventDefault();
      }}
    >
      <IconButton
        className="text-white"
        sx={{
          ":hover": {
            bgcolor: "rgb(17 24 39)",
          },
          color: "white",
        }}
        size="large"
        color="inherit"
        onClick={onPlayButtonClick}
      >
        {isPaused ? (
          <PlayArrowRoundedIcon fontSize="inherit" />
        ) : (
          <PauseRoundedIcon fontSize="inherit" />
        )}
      </IconButton>

      <Slider
        aria-label="Animation Progress"
        value={value}
        onChange={(_e, value) => {
          if (!isPaused) setPaused(true);
          setValue(value as number);
          onScrub(value as number);
        }}
        step={0.1}
        sx={{
          "& .MuiSlider-thumb": {
            transition: "none",
          },
          "& .MuiSlider-track": {
            transition: "none",
          },
        }}
      />
    </Stack>
  );
};

export default Player;
