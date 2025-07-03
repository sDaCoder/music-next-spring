import AlbumsList from "@/components/AlbumsList/AlbumsList";

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
      <AlbumsList />
      {/* <section>This is the section for the Genres</section>
      <section>This is the section for the Artists</section> */}
    </>
  );
}

export default Home