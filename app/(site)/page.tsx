import Header from "@/components/Header/Header";
import ListItem from "@/components/ListItem/ListItem";
import PageContent from "@/components/Content/PageContent";
import PlaylistItem from "@/components/ListItem/PlaylistItem";
import PublicPlaylist from "@/components/Content/PublicPlaylist";

import getSongs from "@/actions/getSongs";
import getUserPlaylists from "@/actions/getUserPlaylists";
import getPublicPlaylists from "@/actions/getPublicPlaylists";
import getTopLikes from "@/actions/getTopLikes";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs(16);

  const playlists = await getUserPlaylists();
  const publicPlaylists = await getPublicPlaylists();

  const mostLikedSongs = await getTopLikes();

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header>
        <div className="mb-2">
          <h1 className="text-3xl font-semibold text-white">Welcome Back</h1>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <ListItem
              image="/images/liked.jpeg"
              name="Liked Songs"
              href="liked"
            />
            {playlists.length > 0 &&
              playlists.map((item) => (
                <PlaylistItem data={item} key={item.name} />
              ))}
          </div>
        </div>
      </Header>
      <div className="mb-7 mt-2 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Most Liked</h1>
        </div>
        <PageContent songs={mostLikedSongs} />
      </div>
      <div className="mb-7 mt-2 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Newest Songs</h1>
        </div>
        <PageContent songs={songs} />
      </div>
      {publicPlaylists.length > 0 && (
        <div className="mb-7 mt-2 px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-white">
              Public playlists
            </h1>
          </div>
          <PublicPlaylist playlists={publicPlaylists} />
        </div>
      )}
    </div>
  );
}
