import HeaderSkeleton from "@/ui/Skeleton/HeaderSkeleton";
import { Skeleton } from "@/ui/Skeleton/Skeleton";

const loading = () => {
  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <HeaderSkeleton>
        <div className="mb-2 mt-6">
          <Skeleton className="h-7 w-[200px] bg-gray-600"></Skeleton>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 3 }, (_, index) => index + 1).map((id) => (
              <Skeleton
                key={id}
                className="h-[64px] min-w-[250px] bg-gray-600"
              ></Skeleton>
            ))}
          </div>
        </div>
      </HeaderSkeleton>
      <div className="mb-7 mt-4 px-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-[160px] bg-gray-600"></Skeleton>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
          {Array.from({ length: 5 }, (_, index) => index + 1).map((id) => (
            <div
              key={id}
              className="group relative flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
            >
              <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
                <Skeleton className="h-44 w-44 bg-gray-600"></Skeleton>
              </div>
              <div className="flex w-full flex-col items-start gap-y-2 pt-5">
                <Skeleton className="h-3 w-[70px] bg-gray-600"></Skeleton>
                <Skeleton className="h-3 w-[90px] bg-gray-600 pb-2"></Skeleton>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-7 mt-16 px-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-[160px] bg-gray-600"></Skeleton>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
          {Array.from({ length: 16 }, (_, index) => index + 1).map((id) => (
            <div
              key={id}
              className="group relative flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
            >
              <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
                <Skeleton className="h-44 w-44 bg-gray-600"></Skeleton>
              </div>
              <div className="flex w-full flex-col items-start gap-y-1 pt-4">
                <Skeleton className="h-4 w-[100px] bg-gray-600"></Skeleton>
                <Skeleton className="h-4 w-[125px] bg-gray-600 md:w-[150px]"></Skeleton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;
