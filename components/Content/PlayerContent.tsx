"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import {
  ImVolumeHigh,
  ImVolumeMedium,
  ImVolumeLow,
  ImVolumeMute2,
} from "react-icons/im";
import useSound from "use-sound";
import { motion } from "framer-motion";

import MediaItem from "@/components/ListItem/MediaItem";
import Slider from "@/components/Player/Slider";
import DurationSlider from "@/components/Player/DurationSlider";
import LikeButton from "@/ui/Button/LikeButton";

import { Song } from "@/types";
import usePlayer from "@/hooks/Player/usePlayer";
import { formatTime, stringToNumberDuration } from "@/lib/utils";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const [previousVolume, setPreviousVolume] = useState<number | undefined>(
    undefined
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [totalDuration, setTotalDuration] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;

  const handleVolumeIcon = () => {
    if (player.volume >= 0.75) {
      return ImVolumeHigh;
    } else if (player.volume < 0.75 && player.volume >= 0.25) {
      return ImVolumeMedium;
    } else if (player.volume < 0.5 && player.volume > 0) {
      return ImVolumeLow;
    } else {
      return ImVolumeMute2;
    }
  };

  const VolumeIcon = handleVolumeIcon();

  const onPlayNext = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIntervalId(null);

    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    let nextSong;
    if (player.shuffle) {
      nextSong = selectRandomSong(player.ids, player.activeId!);
    } else {
      nextSong = player.ids[currentIndex + 1];
    }

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    let previousSong;
    if (player.shuffle) {
      previousSong = selectRandomSong(player.ids, player.activeId!);
    } else {
      previousSong = player.ids[currentIndex - 1];
    }

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const selectRandomSong = (array: string[], id: string): string => {
    const indexOfSong = array.findIndex((element) => element === id);

    const filteredArray = array.filter((_, index) => index !== indexOfSong);

    const randomIndex = Math.floor(Math.random() * filteredArray.length);

    return filteredArray[randomIndex];
  };

  const startInterval = () => {
    const id = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 1);
    }, 1000);
    setIntervalId(id);
  };

  const handleInitialPlay = () => {
    setIsPlaying(true);
    startInterval();
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: player.volume,
    onplay: () => handleInitialPlay(),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  const handlePlay = useCallback(() => {
    if (!isPlaying) {
      play();
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIntervalId(null);
      pause();
    }
  }, [isPlaying, pause, play, intervalId]);

  const handleVolumeChange = () => {
    if (player.volume > 0) {
      setPreviousVolume(player.volume);
      player.setVolume(0);
    } else {
      if (previousVolume) {
        player.setVolume(previousVolume);
      } else {
        player.setVolume(1);
      }
    }
  };

  useEffect(() => {
    if (!audio) {
      const newAudio = new Audio(songUrl);
      setAudio(newAudio);
    }
  }, [audio, songUrl]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("loadedmetadata", () => {
        const duration = audio.duration;
        setTotalDuration(formatTime(duration));
      });

      return () => {
        audio.removeEventListener("loadedmetadata", () => {});
      };
    }
  }, [audio]);

  useEffect(() => {
    sound?.play();

    return () => sound?.unload();
  }, [sound]);

  return (
    <motion.div
      initial={{ y: "20px" }}
      animate={{ y: 0 }}
      className="grid h-full grid-cols-2 md:grid-cols-3"
    >
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="col-auto flex w-full items-center justify-end md:hidden">
        <div
          onClick={handlePlay}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="hidden h-full w-full max-w-[722px] items-center justify-center gap-x-6 md:flex">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={25}
            className="cursor-pointer text-neutral-400 transition hover:text-white"
          />
          <div
            onClick={handlePlay}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
          >
            <Icon size={25} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={25}
            className="cursor-pointer text-neutral-400 transition hover:text-white"
          />
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-[.75rem] text-neutral-500">
            {formatTime(currentTime)}
          </p>
          <DurationSlider
            max={stringToNumberDuration(totalDuration)}
            value={currentTime}
            onChange={(value) => setCurrentTime(value)}
          />
          <p className="text-[.75rem] text-neutral-500">{totalDuration}</p>
        </div>
      </div>
      <div className="hidden w-full justify-end pr-2 md:flex">
        <div className="flex w-[120px] items-center gap-x-2">
          <VolumeIcon
            onClick={handleVolumeChange}
            size={20}
            className="cursor-pointer text-neutral-400"
          />
          <Slider
            value={player.volume}
            onChange={(value) => player.setVolume(value)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerContent;
