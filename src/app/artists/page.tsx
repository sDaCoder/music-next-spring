"use client"
import ArtistCard from '@/components/ArtistCard/ArtistCard'
import { artistType } from '@/components/ArtistsList/ArtistsList'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Page = () => {

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
            <section className='container mx-auto px-6 py-4 space-y-4'>

                <div className='flex justify-between items-center py-4'>
                    <div className='md:space-y-2'>
                        <h1 className='md:text-5xl text-3xl font-bold'>Popular Artists</h1>
                        <p className='text-xs'>All your favourite artists</p>
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

                <div className='w-full'>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                        {artists.map((artist, index) => (
                            <ArtistCard key={index} artist={artist} />
                        ))}
                    </div>
                </div>


            </section>
        </>
    )
}

export default Page