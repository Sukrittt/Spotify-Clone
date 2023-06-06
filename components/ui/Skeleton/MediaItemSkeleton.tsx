import { Skeleton } from "@/ui/Skeleton/Skeleton";

const MediaItemSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-x-4">
      <div className="flex-1">
        <div className="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50">
          <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
            <Skeleton className="h-12 w-12 rounded-md bg-gray-600"></Skeleton>
          </div>
          <div className="flex flex-col gap-y-1 overflow-hidden">
            <Skeleton className="h-4 w-[150px] bg-gray-600 sm:w-[250px]"></Skeleton>
            <Skeleton className="h-4 w-[100px] bg-gray-600 sm:w-[150px]"></Skeleton>
          </div>
        </div>
      </div>
      <Skeleton className="h-6 w-6 rounded-full bg-gray-600"></Skeleton>
    </div>
  );
};

export default MediaItemSkeleton;
