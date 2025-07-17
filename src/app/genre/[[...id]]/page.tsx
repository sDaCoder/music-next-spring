import GenreInfo from '@/components/GenreInfo/GenreInfo'
import GenreSongsAlbums from '@/components/GenreSongsAlbums/GenreSongsAlbums'

interface PageProps {
    params: Promise<{id: string[]}>
}

const Page: React.FC<PageProps> = async ({ params }) => {

    const { id } = await params;
    const [bgColorIndex, genreId] = id;

    return (
        <>
            <main className='container mx-auto py-2 px-4 mb-36'>
                <GenreInfo genreId={genreId as string} bgColorIndex={Number(bgColorIndex)} />
                <GenreSongsAlbums genreId={genreId as string} />
            </main>
        </>
    )
}

export default Page