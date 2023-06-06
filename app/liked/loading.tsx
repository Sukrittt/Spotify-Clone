import { Skeleton } from "@/ui/Skeleton/Skeleton";
import MediaItemSkeleton from "@/ui/Skeleton/MediaItemSkeleton";
import HeaderSkeleton from "@/ui/Skeleton/HeaderSkeleton";

const Loading = () => {
  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <HeaderSkeleton className="from-purple-800">
        <div className="mt-20">
          <div className="flex flex-col items-center gap-x-5 md:flex-row">
            <Skeleton className="h-32 w-32 rounded-none bg-gray-600 lg:h-44 lg:w-44"></Skeleton>
            <div className="mt-4 flex flex-col items-center gap-y-6 md:mt-0 md:items-start">
              <Skeleton className="hidden h-4 w-[50px] bg-gray-600 md:block"></Skeleton>
              <Skeleton className="h-12 w-[200px] bg-gray-600 md:w-[400px]"></Skeleton>
            </div>
          </div>
        </div>
      </HeaderSkeleton>
      <div className="flex w-full flex-col gap-y-3 p-6">
        <div className="mb-2 flex items-center gap-x-4">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-600"></Skeleton>
          <Skeleton className="h-8 w-8 rounded-full bg-gray-600"></Skeleton>
        </div>
        {Array.from({ length: 5 }, (_, index) => index + 1).map((id) => (
          <MediaItemSkeleton key={id} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
