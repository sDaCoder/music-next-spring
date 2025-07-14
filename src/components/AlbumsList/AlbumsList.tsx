"use client"
import React, { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import { Button } from '../ui/button'
import axios from 'axios'
import AlbumCard from '../AlbumCard/AlbumCard'
import { Skeleton } from '../ui/skeleton'
import { useRouter } from 'next/navigation'

export interface AlbumType {
    albumId: string,
    title: string,
    coverArtUrl: string,
    releaseDate: string,
    description: string
};

const AlbumsList = () => {
    const router = useRouter()
    const [albums, setAlbums] = useState<AlbumType[]>([]);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/albums');
                setAlbums(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false)
            }
        }
        setTimeout(() => {
            fetchData();
        }, 2000);
    }, [])

    return (
        <>
            <section className='space-y-4'>

                <div className='flex justify-between items-center py-4'>
                    <div className='md:space-y-2'>
                        <h1 className='md:text-5xl text-3xl font-bold'>Top Albums</h1>
                        <p className='text-xs'>List of songs made for you</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button 
                            variant={'ghost'}
                            onClick={() => router.push('/albums')}
                        >
                            View All
                        </Button>
                    </div>
                </div>

                {
                    loading && (
                        <div className="h-[30vh] flex flex-col gap-6 items-center justify-center p-6">
                            <Skeleton className="h-20 w-16 rounded-full" />
                            <Skeleton className="h-3 w-[80vw]" />
                            <Skeleton className="h-3 w-[80vw]" />
                            <Skeleton className="h-3 w-[80vw]" />
                        </div>
                    )
                }

                <Carousel className='w-full'>
                    <CarouselContent>
                        {
                            albums.map((album, index) => (
                                <CarouselItem key={index} className='pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5'>
                                    <AlbumCard album={album} />
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
