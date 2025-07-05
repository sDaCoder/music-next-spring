import AlbumsList from "@/components/AlbumsList/AlbumsList";
import ArtistsList from "@/components/ArtistsList/ArtistsList";
import GenresList from "@/components/GenresList/GenresList";

const Home: React.FC = () => {
  return (
    <>
      {/* <h1 className="text-3xl text-center font-bold">This is a music app</h1>
      <Link href="/player" className="text-3xl my-8 text-green-500 font-bold underline block text-center">
        Click me to open the music player
      </Link>
      <Link href="/songs" className="text-3xl my-8 text-green-500 font-bold underline block text-center">
        Click me to open the songs list
      </Link> */}
      <main className="container mx-auto space-y-8 py-4 px-6">
        <AlbumsList />
        <ArtistsList />
        <GenresList />
      </main>
    </>
  );
}

export default Home