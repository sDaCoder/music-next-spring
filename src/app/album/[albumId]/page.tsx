import AlbumInfo from '@/components/AlbumInfo/AlbumInfo';
import AlbumSongs from '@/components/AlbumSongs/AlbumSongs';

interface PageProps {
    params: Promise<{ albumId: string }>
}

const Page: React.FC<PageProps> = async ({params}) => {
    // const params = useParams<{ albumId: string }>();
    const {albumId} = await params
    
    return (
        <>
            <main className='container mx-auto px-4 py-8 mb-36'>
                <AlbumInfo albumId={albumId} />
                <AlbumSongs albumId={albumId} />
            </main>
        </>
    )
}

export default Page