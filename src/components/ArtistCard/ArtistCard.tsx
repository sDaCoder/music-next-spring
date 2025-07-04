import Image from 'next/image'
import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { artistType } from '../ArtistsList/ArtistsList'

interface ArtistCardProps {
    artist: artistType
}

const ArtistCard: React.FC<ArtistCardProps> = ({artist}) => {
    return (
        <>
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 space-y-3">
                    <div className="relative aspect-square overflow-hidden rounded-full">
                        <Image
                            src={artist?.img || "/demo-img.jpg"}
                            alt={artist.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    </div>
                    <div className="text-center space-y-1">
                        <h4 className="font-medium truncate">{artist?.name}</h4>
                        {/* <p className="text-sm text-muted-foreground">{artist.followers} followers</p> */}
                    </div>
                    <Button size="sm" className="w-full">
                        Follow
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}

export default ArtistCard