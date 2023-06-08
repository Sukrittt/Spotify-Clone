"use client";
import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

import { useUser } from "@/hooks/User/useUser";
import useAuthModal from "@/hooks/Modals/useAuthModal";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
  isPublic?: boolean;
}

const ListItem: FC<ListItemProps> = ({ image, name, href, isPublic }) => {
  const router = useRouter();

  const { user } = useUser();
  const { onOpen } = useAuthModal();

  const onClick = () => {
    if (!user) {
      return onOpen();
    }

    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-x-4 overflow-hidden rounded-md bg-neutral-100/10 pr-4 transition hover:bg-neutral-100/20"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image src={image} alt="liked" fill className="object-cover" />
      </div>
      <div className="flex items-center gap-x-1">
        <p className="truncate py-5 font-medium">{name}</p>
        {isPublic && (
          <p className="truncate text-sm text-neutral-400">- Public</p>
        )}
      </div>
      <div className="absolute right-5 flex items-center justify-center rounded-full bg-green-500 p-4 opacity-0 drop-shadow-md transition hover:scale-110 group-hover:opacity-100">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
