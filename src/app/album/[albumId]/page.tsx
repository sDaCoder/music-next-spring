"use client"
import { AlbumType } from '@/components/AlbumsList/AlbumsList';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import axios from 'axios';
import { Download, Heart, MoreHorizontal, Play } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const params = useParams();
    const [album, setAlbum] = useState<AlbumType>()

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/albums/${params.albumId}`)
                setAlbum(res.data)
                console.log(res.data);

            } catch (error) {
                console.log("Error occurred while fetching album: " + error);
            }
        }
        fetchAlbum()
    }, [])


    return (
        <>
            <main className='container mx-auto px-4 py-8'>

            
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="flex-shrink-0">
                    <Card className="overflow-hidden">
                        <div className="relative aspect-square w-full md:w-80">
                            <Image
                                src={`/${album?.coverArtUrl}` || "/placeholder.svg"}
                                alt={album?.title || "Album Cover"}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </Card>
                </div>

                <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Album</p>
                        <h1 className="text-3xl md:text-5xl font-bold">{album?.title}</h1>
                        {/* <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{albumData.artist}</span>
                <span>•</span>
                <span>{albumData.year}</span>
                <span>•</span>
                <span>{songs.length} songs</span>
                <span>•</span>
                <span>{formatTotalDuration(totalDuration)}</span>
              </div> */}
                    </div>

                    <p className="text-muted-foreground max-w-2xl">Released on {album?.releaseDate}</p>

                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="gap-2">
                            <Play className="h-5 w-5" />
                            Play Album
                        </Button>
                        <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                            <Heart className="h-5 w-5" />
                            Save
                        </Button>
                        <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                            <Download className="h-5 w-5" />
                            Download
                        </Button>
                        <Button variant="ghost" size="lg">
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