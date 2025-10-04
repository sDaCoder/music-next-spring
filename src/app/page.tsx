import AlbumsList from "@/components/AlbumsList/AlbumsList";
import ArtistsList from "@/components/ArtistsList/ArtistsList";
import GenresList from "@/components/GenresList/GenresList";
import RecentsList from "@/components/RecentsList/RecentsList";

const Home: React.FC = () => {
  return (
    <>
      {/* <Link href="/player" className="text-3xl my-8 text-green-500 font-bold underline block text-center">
        Click me to open the music player
      </Link>
      <Link href="/songs" className="text-3xl my-8 text-green-500 font-bold underline block text-center">
        Click me to open the songs list
      </Link> */}
      <main className="container mx-auto space-y-8 py-4 px-6 mb-36">
        <RecentsList />
        <AlbumsList />
        <ArtistsList />
        <GenresList />
      </main>
    </>
  );
}

export default Home