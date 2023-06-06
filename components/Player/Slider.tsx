"use client";
import { FC } from "react";
import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  value?: number;
  onChange: (value: number) => void;
}

const Slider: FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="group relative flex h-5 w-full touch-none select-none items-center"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.01}
      aria-label="Volume"
    >
      <RadixSlider.Track className="relative h-[3px] grow rounded-full bg-neutral-600">
        <RadixSlider.Range className="absolute h-full rounded-full bg-white group-hover:bg-green-500 " />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className="hidden h-2 w-2 rounded-full bg-white focus:outline-none group-hover:block"
        aria-label="Volume"
      />
    </RadixSlider.Root>
  );
};

export default Slider;
