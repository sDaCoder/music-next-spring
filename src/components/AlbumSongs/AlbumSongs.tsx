"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { MoreHorizontal, Pause, Play } from 'lucide-react'
import { formatTime, SongType } from '../AudioPlayerFooter/AudioPlayerFooter'
import useMusicStateData from '@/hooks/useMusicStateData'
import axios from 'axios'

interface AlbumSongsProps {
    albumId: string
}

const AlbumSongs: React.FC<AlbumSongsProps> = ({albumId}) => {
    const [albumSongs, setAlbumSongs] = useState<SongType[]>([])
    const {songId, setSongId} = useMusicStateData()

    useEffect(() => {
        const fetchAlbumSongs = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/albums/${albumId}/songs`)
                setAlbumSongs(res.data)
                console.log(res.data);
            } catch (error) {
                console.log("Error occurred while fetching album songs: " + error);
            }
        }
        fetchAlbumSongs()
    }, [])

    return (
        <>
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Popular Tracks</h2>
                <div className="space-y-2">
                    {albumSongs.map((song: SongType, index) => (
                        <div
                            key={index}
                            className={`group flex items-center gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer ${song.songId === songId ? "bg-muted/50" : ""}`}
                        >
                            <div className="w-8 flex items-center justify-center">
                                <span className={`text-sm text-muted-foreground group-hover:hidden ${song.songId === songId ? "hidden" : ""}`}>{index + 1}</span>
                                <Button
                                    variant="ghost" size="icon" className={`h-6 w-6 hidden group-hover:flex ${song.songId === songId ? "flex" : ""}`}
                                    onClick={() => {
                                        setSongId(song.songId)
                                    }}
                                >
                                    {songId === song.songId ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                                </Button>
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">{song.title}</h3>
                                {/* <p className="text-sm text-muted-foreground">{artistSong.plays} plays</p> */}
                            </div>

                            <div className="text-sm text-muted-foreground">{formatTime(song.durationSeconds)}</div>

                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AlbumSongs