import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import Button from "@/ui/Button/Button";
import { useUser } from "@/hooks/User/useUser";

const DeleteAlertDialog = () => {
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const searchParams = useSearchParams();
  const playlistName = searchParams.get("name");

  const handleDeletePlaylist = async () => {
    if (!user) {
      return;
    }

    const { error: supabaseError } = await supabaseClient
      .from("playlists")
      .delete()
      .eq("user_id", user.id)
      .eq("name", playlistName);

    if (supabaseError) {
      toast.error("Something went wrong");
    }

    router.refresh();
    router.push("/");
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <p className="w-full cursor-pointer truncate rounded-md p-3 text-sm transition hover:bg-neutral-600 hover:outline-none">
          Delete playlist
        </p>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-neutral-900/90 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <AlertDialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-[25px] data-[state=open]:animate-contentShow sm:w-[40vw]">
          <AlertDialog.Title className="m-0 text-lg font-bold text-black">
            Delete from Library?
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-5 mt-4 text-sm leading-normal text-black">
            This will delete this playlist from your library.
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <Button className="bg-white text-black">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild onClick={handleDeletePlaylist}>
              <Button>Delete</Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default DeleteAlertDialog;
