import { FC } from "react";
import { twMerge } from "tailwind-merge";

import { Skeleton } from "@/ui/Skeleton/Skeleton";

interface HeaderSkeletonProps {
  children: React.ReactNode;
  className?: string;
}

const HeaderSkeleton: FC<HeaderSkeletonProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-green-800 p-6",
        className
      )}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="hidden items-center gap-x-2 md:flex">
          <Skeleton className="h-8 w-8 rounded-full  bg-gray-500"></Skeleton>
          <Skeleton className="h-8 w-8 rounded-full  bg-gray-500"></Skeleton>
        </div>
        <div className="flex items-center gap-x-2 md:hidden">
          <Skeleton className="h-9 w-9 rounded-full  bg-gray-500"></Skeleton>
          <Skeleton className="h-9 w-9 rounded-full  bg-gray-500"></Skeleton>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <Skeleton className="h-10 w-[100px] rounded-full  bg-gray-500"></Skeleton>
          <Skeleton className="h-10 w-10 rounded-full  bg-gray-500"></Skeleton>
        </div>
      </div>

      {children}
    </div>
  );
};

export default HeaderSkeleton;
