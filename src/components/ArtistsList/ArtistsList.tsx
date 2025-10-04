"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import axios from 'axios'
import ArtistCard from '../ArtistCard/ArtistCard'
import { Skeleton } from '../ui/skeleton'
import { useRouter } from 'next/navigation'

export interface artistType {
    artistId: string,
    name: string,
    imageUrl: string,
    bio: string
}

const ArtistsList = () => {
    const router = useRouter()
    const [artists, setArtists] = useState<artistType[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/artists');
                setArtists(response.data);
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
            <section className="space-y-6">

                <div className='flex justify-between items-center py-4'>
                    <div className='md:space-y-2'>
                        <h1 className='md:text-5xl text-3xl font-bold'>Popular Artists</h1>
                        <p className='text-xs'>All your favourite artists</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button onClick={() => router.push('/artists')} variant={'ghost'}>View All</Button>
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

                <Carousel className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {artists.map((artist, index) => (
                            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
                            >
                                <ArtistCard artist={artist} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

            </section>
        </>
    )
}

export default ArtistsList