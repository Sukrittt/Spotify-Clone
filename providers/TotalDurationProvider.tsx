"use client";
import React, { FC } from "react";

import { Playlist } from "@/types";
import useTotalDuration from "@/hooks/Player/useTotalDuration";

interface TotalDurationProps {
  playlist: Playlist[];
}

const TotalDurationProvider: FC<TotalDurationProps> = ({ playlist }) => {
  const totalDuration = useTotalDuration(playlist);

  if (!totalDuration) {
    return null;
  }

  return (
    <p className="text-sm font-semibold text-neutral-500">
      <span className="text-white">,</span> {totalDuration}
    </p>
  );
};

export default TotalDurationProvider;
