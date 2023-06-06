"use client";
import { FC } from "react";
import * as RadixSlider from "@radix-ui/react-slider";

interface DurationSliderProps {
  value?: number;
  max: number;
  onChange: (value: number) => void;
}

const DurationSlider: FC<DurationSliderProps> = ({
  value = 0,
  onChange,
  max,
}) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="relative flex h-5 w-full touch-none select-none items-center"
      defaultValue={[0]}
      value={[value]}
      onValueChange={handleChange}
      max={max}
      step={1}
      aria-label="Duration"
      disabled
    >
      <RadixSlider.Track className="relative h-[3px] grow rounded-full bg-neutral-600">
        <RadixSlider.Range className="absolute h-full rounded-full bg-white" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default DurationSlider;
