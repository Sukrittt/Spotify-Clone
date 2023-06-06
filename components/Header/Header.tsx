"use client";

import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";

import Button from "@/ui/Button/Button";
import HoverUserCard from "@/components/Header/HoverCard";

import useAuthModal from "@/hooks/Modals/useAuthModal";
import { useUser } from "@/hooks/User/useUser";
import usePlayer from "@/hooks/Player/usePlayer";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { onOpen } = useAuthModal();
  const { reset } = usePlayer();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();
    reset();

    if (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className
      )}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="hidden items-center gap-x-2 md:flex">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex items-center gap-x-2 md:hidden">
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            onClick={() => router.push("/search")}
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-4">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <HoverUserCard />
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className="bg-transparent font-medium text-neutral-300"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button onClick={onOpen} className="bg-white px-6 py-2">
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
