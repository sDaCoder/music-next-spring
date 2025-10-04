import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Heart, MoreHorizontal, Play } from 'lucide-react'
import { AlbumType } from '../AlbumsList/AlbumsList'
import { useRouter } from 'next/navigation'

interface AlbumCardProps {
    album: AlbumType;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {

    const router = useRouter()
    return (
        <>
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 space-y-3">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                        <Image
                            src={`/${album?.coverArtUrl}`}
                            alt={album?.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105 shadow-md"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="flex gap-2">
                            <Button size="icon" variant="secondary" className="rounded-full">
                              <Play className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="secondary" className="rounded-full">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="secondary" className="rounded-full">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h4 
                          className="font-medium truncate"
                          onClick={() => router.push(`/album/${album.albumId}`)}
                        >{album?.title}</h4>
                        <p className="text-sm text-muted-foreground truncate">Released on {album?.releaseDate}</p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default AlbumCard