import ArtistInfo from '@/components/ArtistInfo/ArtistInfo'
import ArtistSongsAlbums from '@/components/ArtistSongsAlbums/ArtistSongsAlbums'

interface PageProps {
    params: Promise<{ artistId: string }>
}

const Page: React.FC<PageProps> = async ({ params }) => {

    const { artistId } = await params
    return (
        <>
            <main className='container mx-auto py-8 px-4 mb-20'>
                <ArtistInfo artistId={artistId} />
                <ArtistSongsAlbums artistId={artistId} />
            </main>
        </>
    )
}

export default Page