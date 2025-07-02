'use client'
import AudioPlayerFooter from "@/components/AudioPlayerFooter/AudioPlayerFooter"
import SongCard from "@/components/SongCard/SongCard"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"
import React, { useEffect, useState } from "react"

const Page: React.FC = () => {

    const [songsList, setSongsList] = useState<Array<any>>([])
    const [currentSongId, setCurrentSongId] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        setLoading(true)
        const fetchSongs = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/songs')
                setSongsList(res.data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        fetchSongs()
    }, [])


    if (loading) {
        return (
            <>
                <h1 className="text-3xl text-center font-bold my-3">My Songs</h1>
                <div className="h-[30vh] flex flex-col gap-6 items-center justify-center p-6">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <Skeleton className="h-3 w-[80vw]" />
                    <Skeleton className="h-3 w-[80vw]" />
                    <Skeleton className="h-3 w-[80vw]" />
                </div>
            </>
        )
    }

    if(songsList.length === 0) {
        return (
            <>
                <h1 className="text-3xl text-center font-bold my-3">My Songs</h1>
                <div className="h-[30vh] flex flex-col gap-6 items-center justify-center p-6">
                    <p>No songs found.</p>
                </div>
            </>
        )
    }

    return (
        <>
            <h1 className="text-3xl text-center font-bold my-3">My Songs</h1>
            <div className="flex flex-wrap gap-6 items-center justify-center p-6">
                <Carousel opts={{
                    align: "start",
                }}
                    className="w-full max-w-[68vw]">
                    <CarouselContent>
                        {songsList.map((song: any, index) => (
                            <CarouselItem key={index} className="md:basis-1/3">
                                <div className="p-1">
                                    <SongCard
                                        index={index}
                                        setCurrentSongId={setCurrentSongId}
                                        songId={song.songId}
                                        songTitle={song.title}
                                    />
                                </div>
                            </CarouselItem>
                        ))}

                    </CarouselContent>
                    <CarouselNext />
                    <CarouselPrevious />
                </Carousel>
            </div>

            {/* {currentSongId && <PlayerFooter currentSongId={currentSongId} />} */}
            {currentSongId !== '' && <AudioPlayerFooter currentSongId={currentSongId} />}
        </>
    )
}



export default Page