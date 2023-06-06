import Header from "@/components/Header/Header";
import PlaylistContent from "@/components/Content/PlaylistContent";
import PlaylistDropdown from "@/components/Dropdown/PlaylistDropdown";

import getPlaylistByName from "@/actions/getPlaylistByName";
import getSongsByTitle from "@/actions/getSongsByTitle";
import getPlaylistSongs from "@/actions/getPlaylistSongs";
import ImageProvider from "@/providers/ImageProvider";
import TotalDurationProvider from "@/providers/TotalDurationProvider";
import getUserPlaylists from "@/actions/getUserPlaylists";

interface PlaylistProps {
  searchParams: {
    name: string;
    title: string;
  };
}

export const revalidate = 0;

const Playlist = async ({ searchParams }: PlaylistProps) => {
  const songs = await getSongsByTitle(searchParams.title);
  const playlist = await getPlaylistByName(searchParams.name);
  const userPlaylists = await getUserPlaylists();

  const countNumberOfSongs = (): number => {
    let tempPlaylist = playlist;
    tempPlaylist = tempPlaylist.filter((object) => object.songs !== null);

    return tempPlaylist.length;
  };

  const noOfSongs = countNumberOfSongs();

  let playlistSongs = await getPlaylistSongs(searchParams.name);
  playlistSongs = playlistSongs.filter((song) => song.id !== undefined);

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header className="from-neutral-600">
        <div className="mt-20">
          <div className="flex flex-col items-center gap-x-5 md:flex-row">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <ImageProvider data={playlist} />
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="mt-4 flex flex-col gap-y-2 md:mt-0">
                <p className="hidden text-sm font-semibold md:block">
                  Playlist
                </p>
                <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-7xl">
                  {searchParams.name}
                </h1>
              </div>
              {noOfSongs > 0 && (
                <div className="flex gap-x-1">
                  {playlist[0].user_name && (
                    <p className="text-sm font-semibold">
                      {playlist[0].user_name} •
                    </p>
                  )}
                  <div className="flex">
                    <p className="truncate text-sm font-semibold">
                      {noOfSongs} {noOfSongs === 1 ? "song" : "songs"}
                    </p>
                    <TotalDurationProvider playlist={playlist} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <PlaylistDropdown />
        </div>
      </Header>
      <PlaylistContent
        playlist={playlist}
        songsByTitle={songs}
        playlistSongs={playlistSongs}
        userPlaylists={userPlaylists}
      />
    </div>
  );
};

export default Playlist;
