"use client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import uniqid from "uniqid";

import Modal from "@/ui/Modal/Modal";
import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import SwitchPrivacy from "@/ui/Input/Switch";

import { useUser } from "@/hooks/User/useUser";
import usePlaylistModal from "@/hooks/Modals/usePlaylistModal";

const PlaylistModal = () => {
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { isOpen, onClose, songId } = usePlaylistModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      image: null,
      username: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    console.log("clicked");

    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];

      if (!values.name || !user) {
        return toast.error("Missing Fields");
      }

      const uniqueId = uniqid();
      let imageContent;

      //Upload Image
      if (imageFile) {
        const { data: imageData, error: imageError } =
          await supabaseClient.storage
            .from("images")
            .upload(`image-${values.name}-${uniqueId}`, imageFile, {
              cacheControl: "3600",
              upsert: false,
            });

        imageContent = imageData;

        if (imageError) {
          setIsLoading(false);
          return toast.error("Failed to upload image.");
        }
      }

      if (await playlistDuplicationCheck(values.name)) {
        return toast.error("Playlist with that name already exists.");
      }

      const { error: supabaseError } = await supabaseClient
        .from("playlists")
        .insert({
          user_id: user.id,
          image_path: imageContent && imageContent.path,
          name: values.name,
          user_name: values.username,
          public: isPublic,
        });

      if (songId) {
        const { error } = await supabaseClient.from("playlists").insert({
          user_id: user.id,
          image_path: imageContent && imageContent.path,
          song_id: songId,
          name: values.name || null,
          user_name: values.username,
          public: isPublic,
        });

        if (error) {
          toast.error(error.message);
        }
      }

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      successOperation();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const successOperation = () => {
    router.refresh();
    setIsLoading(false);
    toast.success("Playlist created succesfully!");
    reset();
    onClose();
  };

  const playlistDuplicationCheck = async (name: string) => {
    if (!user) {
      return;
    }

    if (isPublic) {
      const { data, error } = await supabaseClient
        .from("playlists")
        .select("*")
        .is("public", true)
        .ilike("name", name);

      if (!error && data.length > 0) {
        return true;
      }
    } else {
      const { data, error } = await supabaseClient
        .from("playlists")
        .select("*")
        .eq("user_id", user.id)
        .ilike("name", name);

      if (!error && data.length > 0) {
        return true;
      }
    }

    return false;
  };

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal title="Create your own playlist" isOpen={isOpen} onChange={onChange}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="name"
          disabled={isLoading}
          {...register("name", { required: true })}
          placeholder="Playlist name"
        />
        <div>
          <p className="pb-1">Select an image (optional)</p>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            className="cursor-pointer"
            accept="image/*"
            {...register("image")}
          />
        </div>
        <div className="py-1">
          <SwitchPrivacy
            checked={isPublic}
            onChange={(checked: boolean) => setIsPublic(checked)}
          />
        </div>
        {isPublic && (
          <div>
            <p className="pb-1">Tell us your name (optional)</p>
            <Input
              id="username"
              disabled={isLoading}
              {...register("username")}
              placeholder="Your name"
            />
          </div>
        )}
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default PlaylistModal;
