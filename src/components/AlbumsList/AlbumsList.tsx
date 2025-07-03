"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Play } from 'lucide-react'
import axios from 'axios'

type Album = {
    title: string;
    coverArtUrl: string;
    releaseDate: string;
    // Add other properties as needed, e.g.:
    // artist: string;
};

const AlbumsList = () => {

    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/albums');
                setAlbums(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [])


    return (
        <>
            <section className='md:px-28 px-16 pt-6 h-[40vh]'>

                <div className='flex justify-between items-center py-8'>
                    <div>
                        <h1 className='text-5xl font-bold'>Albums</h1>
                        <p className='text-xs'>List of songs made for you</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button variant={'ghost'}>View All</Button>
                    </div>
                </div>

                <Carousel className='w-full'>
                    <CarouselContent>
                        {
                            albums.map((album, index) => (
                                <CarouselItem key={index} className='pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'>
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
                                                    <Button size="icon" className="rounded-full"> <Play className="h-4 w-4" /> </Button>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-medium truncate">{album?.title}</h4>
                                                <p className="text-sm text-muted-foreground truncate">Released on {album?.releaseDate}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>

                </Carousel>
            </section>
        </>
    )
}

export default AlbumsList
