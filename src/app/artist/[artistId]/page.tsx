"use client"
import { artistType } from '@/components/ArtistsList/ArtistsList'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Heart, MoreHorizontal, Play } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {

    const { artistId } = useParams()
    const [artist, setArtist] = useState<artistType>()

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/artists/${artistId}`)
                setArtist(res.data)
                console.log(res.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchArtist()

    }, [])


    return (
        <>
            <main className='container mx-auto py-8 px-4'>

            
            <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="flex-shrink-0">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0">
                        <Image
                            src={"/demo-img.jpg"}
                            alt={artist?.name || "Artist image"}
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>
                </div>

                <div className="flex-1 space-y-6 text-center md:text-left">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Artist</p>
                        <h1 className="text-4xl md:text-6xl font-bold">{artist?.name}</h1>
                        {/* <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{artistData.followers} followers</span>
                        </div> */}
                    </div>

                    <p className="text-muted-foreground max-w-2xl">This is the description of the artist</p>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <Button size="lg" className="gap-2">
                            <Play className="h-5 w-5" />
                            Play
                        </Button>
                        <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                            <Heart className="h-5 w-5" />
                            Follow
                        </Button>
                        <Button variant="outline" size="icon" className='rounded-full'>
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
            </main>
        </>
    )
}

export default Page