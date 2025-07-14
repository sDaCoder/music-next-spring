import ArtistInfo from '@/components/ArtistInfo/ArtistInfo'
import ArtistSongsAlbums from '@/components/ArtistSongsAlbums/ArtistSongsAlbums'

interface PageProps {
    params: {
        artistId: string
    }
}

const Page: React.FC<PageProps> = ({ params }) => {

    const { artistId } = params
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