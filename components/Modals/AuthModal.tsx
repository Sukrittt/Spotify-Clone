"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import Modal from "@/ui/Modal/Modal";
import useAuthModal from "@/hooks/Modals/useAuthModal";

interface AuthModalProps {}

const AuthModal: FC<AuthModalProps> = ({}) => {
  const router = useRouter();

  const { isOpen, onClose } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      title="Welcome Back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        theme="dark"
        providers={["github"]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
