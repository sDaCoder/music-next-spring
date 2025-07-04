"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import axios from 'axios'
import ArtistCard from '../ArtistCard/ArtistCard'

export interface artistType {
    artistId: string,
    name: string,
    img: string
}

const ArtistsList = () => {
    const [artists, setArtists] = useState<artistType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/artists');
                setArtists(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])
    

    return (
        <>
            <section className="space-y-6">

                <div className='flex justify-between items-center py-4'>
                    <div>
                        <h1 className='text-5xl font-bold'>Artists</h1>
                        <p className='text-xs'>List of your favourite artists</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button variant={'ghost'}>View All</Button>
                    </div>
                </div>

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