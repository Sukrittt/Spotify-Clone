"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { RxDotsHorizontal } from "react-icons/rx";
import { toast } from "react-hot-toast";
import { usePathname, useSearchParams } from "next/navigation";

import DeleteAlertDialog from "@/ui/Modal/AlertDialog";

const PlaylistDropdown = () => {
  const path = usePathname();
  const searchParams = useSearchParams();

  const playlistName = searchParams.get("name");

  const url = `https://spotify-clone-ebon-theta.vercel.app${path}?name=${playlistName}`;

  const handleShareUrl = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="my-6 text-neutral-400 transition hover:text-white">
          <RxDotsHorizontal size={25} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="relative left-8 min-w-[150px] rounded-md bg-neutral-800 shadow-lg shadow-neutral-900 md:left-14"
          sideOffset={5}
        >
          <DeleteAlertDialog />
          <DropdownMenu.Item
            onClick={handleShareUrl}
            className="cursor-pointer rounded-md p-3 transition hover:bg-neutral-600 hover:outline-none"
          >
            <p className="truncate text-sm">Share</p>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default PlaylistDropdown;
