import { Skeleton } from "@/ui/Skeleton/Skeleton";
import HeaderSkeleton from "@/ui/Skeleton/HeaderSkeleton";
import MediaItemSkeleton from "@/ui/Skeleton/MediaItemSkeleton";

const Loading = () => {
  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <HeaderSkeleton className="from-neutral-900">
        <div className="mb-2 mt-6 flex flex-col gap-y-6">
          <Skeleton className="h-8 w-[100px] bg-gray-600"></Skeleton>
          <Skeleton className="h-10 w-full bg-gray-600"></Skeleton>
        </div>
      </HeaderSkeleton>
      <div className="mt-2 flex w-full flex-col gap-y-2 px-6">
        {Array.from({ length: 10 }, (_, index) => index + 1).map((id) => (
          <MediaItemSkeleton key={id} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
