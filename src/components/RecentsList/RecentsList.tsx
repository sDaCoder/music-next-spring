"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import axios from 'axios'
import RecentCard from '../RecentCard/RecentCard'
import { useRouter } from 'next/navigation'

// const recentlyPlayed = [
//     { id: 1, title: "Midnight Dreams", artist: "Luna Eclipse", cover: "/placeholder.svg?height=200&width=200" },
//     { id: 2, title: "Electric Nights", artist: "Neon Pulse", cover: "/placeholder.svg?height=200&width=200" },
//     { id: 3, title: "Ocean Waves", artist: "Coastal Vibes", cover: "/placeholder.svg?height=200&width=200" },
//     { id: 4, title: "City Lights", artist: "Urban Sound", cover: "/placeholder.svg?height=200&width=200" },
//     { id: 5, title: "Mountain High", artist: "Peak Harmony", cover: "/placeholder.svg?height=200&width=200" },
//     { id: 6, title: "Desert Storm", artist: "Sand Dunes", cover: "/placeholder.svg?height=200&width=200" },
//   ]

export interface Recent {
    songId: string
    title: string;
    duration: number
    id: string;
}

const RecentsList = () => {

    const [recents, setRecents] = useState<Recent []>([]);

    useEffect(() => {
        const fetchRecents = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/history')
                setRecents(res.data);
            } catch (error) {
                console.log("Some error occurred while fetching the recents: " + error);
            }
        };
        fetchRecents();
    }, [])

    const router = useRouter();

    return (
        <>
            <section className="space-y-4">
                <div className='flex justify-between items-center py-4'>
                    <div className='md:space-y-2'>
                        <h1 className='md:text-5xl text-3xl font-bold'>Recently Played</h1>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button
                            variant={'ghost'}
                            onClick={() => router.push('/recents')}
                        >
                            View All
                        </Button>
                    </div>
                </div>

                <Carousel className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {recents.map((recent: Recent) => (
                            <CarouselItem
                                key={recent.id}
                                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                            >
                                <RecentCard recent={recent} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </section>
        </>
    )
}

export default RecentsList