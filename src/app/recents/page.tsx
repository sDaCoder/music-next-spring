"use client"
import RecentCard from '@/components/RecentCard/RecentCard';
import { Recent } from '@/components/RecentsList/RecentsList';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Page = () => {
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

    return (
        <>
            <section className='container mx-auto px-6 py-4 space-y-4'>
                <div className='flex justify-between items-center py-4'>
                    <div className='md:space-y-2'>
                        <h1 className='md:text-5xl text-3xl font-bold'>Recently Played</h1>
                    </div>
                </div>

                <div className="w-full">
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                        {recents.map((recent) => (
                            <RecentCard key={recent.songId} recent={recent} />
                        ))}
                    </div>
                </div>

            </section>
        </>
    )
}

export default Page