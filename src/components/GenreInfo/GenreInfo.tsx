"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Play } from 'lucide-react'
import { bgColors } from '../GenreCard/GenreCard'
import { GenreType } from '../GenresList/GenresList'
import axios from 'axios'

interface GenreInfoProps {
    genreId: string
    bgColorIndex: number
}

const GenreInfo: React.FC<GenreInfoProps> = ({genreId, bgColorIndex}) => {

    const [genre, setGenre] = useState<GenreType>()
    const [genres, setGenres] = useState<GenreType[]>([])
    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/genres/${genreId}`)
                setGenre(res.data)
                console.log(res.data)
            } catch (error) {
                console.log("Some error occurred: " + error);
            }
        }
        const fetchGenres = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/genres')
                setGenres(res.data)
                console.log(res.data)
            } catch (error) {
                console.log("Some error occurred: " + error);
            }
        }
        fetchGenre()
        fetchGenres()
    }, [])


    if(bgColorIndex < 0 || bgColorIndex >= genres.length || !genre || !genreId) 
    {
        return (
            <>
                <div>No genre found</div>
            </>
        )
    }

    return (
        <>
            <div className="mb-12">
                <div className={`bg-gradient-to-br ${bgColors[bgColorIndex % bgColors.length]} rounded-2xl p-8 md:p-12 text-white relative overflow-hidden`}>
                    <div className="relative z-10">
                        <p className="text-sm font-medium uppercase tracking-wide opacity-90 mb-2">Genre</p>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{genre?.name}</h1>
                        <p className="text-lg opacity-90 max-w-2xl mb-6">This is the description of the genre</p>
                        <Button size="lg" className="bg-white text-black hover:bg-white/90">
                            <Play className="h-5 w-5 mr-2" />
                            Play {genre?.name}
                        </Button>
                    </div>
                    <div className="absolute inset-0 bg-black/20" />
                </div>
            </div>
        </>
    )
}

export default GenreInfo