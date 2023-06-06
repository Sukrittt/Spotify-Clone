"use client";
import { useEffect, useState } from "react";

import AuthModal from "@/components/Modals/AuthModal";
import UploadModal from "@/components/Modals/UploadModal";
import PlaylistModal from "@/components/Modals/PlaylistModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      <PlaylistModal />
    </>
  );
};

export default ModalProvider;
