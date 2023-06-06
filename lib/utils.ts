import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Playlist, Song } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const selectRandomSong = (array: Song[]): string => {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex].id;
};

export const formatTime = (secondsDuration: number): string => {
  const minutes = Math.floor(secondsDuration / 60);
  const seconds = Math.floor(secondsDuration % 60);
  const formattedDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return formattedDuration;
};

export const stringToNumberDuration = (time: string): number => {
  const [minutesString, secondsString] = time.split(":");
  const minutes = parseInt(minutesString, 10);
  const seconds = parseInt(secondsString, 10);
  const totalDurationInSeconds = minutes * 60 + seconds;

  return totalDurationInSeconds;
};

export const formatTimeSecondary = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);

  if (hours > 0) {
    return ` ${hours} hr ${remainingMinutes} min ${remainingSeconds} sec`;
  }

  return ` ${minutes} min ${remainingSeconds} sec`;
};
