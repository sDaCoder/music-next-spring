"use client"
import useMusicStateData from '@/hooks/useMusicStateData';
import React, { useEffect, useState } from 'react'
import { AlbumType } from '../AlbumsList/AlbumsList';
import axios from 'axios';
import { Button } from '../ui/button';
import { MoreHorizontal, Pause, Play } from 'lucide-react';
import { formatTime } from '../AudioPlayerFooter/AudioPlayerFooter';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

interface ArtistSongsType {
    songId: string,
    title: string,
    durationSeconds: number,
    id: string,
}

interface ArtistAlbumsType {
    artistId: string,
}

const ArtistSongsAlbums: React.FC<ArtistAlbumsType> = ({ artistId }) => {

    const [artistSongs, setArtistSongs] = useState<ArtistSongsType[]>([]);
    const [artistAlbums, setArtistAlbums] = useState<AlbumType[]>([])
    const { songId, setSongId } = useMusicStateData()

    useEffect(() => {
        
        const fetchArtistSongs = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/artists/${artistId}/songs`)
                setArtistSongs(res.data)
            } catch (error) {
                console.log("Error occurred while fetching the songs of the artist: " + error);
            }
        }
        const fetchArtistAlbums = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/artists/${artistId}/albums`)
                setArtistAlbums(res.data)
            } catch (error) {
                console.log("Error occurred while fetching the albums of the artist: " + error);
            }
        }
        fetchArtistSongs()
        fetchArtistAlbums()
    }, [])


    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-semibold">Popular</h2>
                    <div className="space-y-2">
                        {artistSongs.map((artistSong: ArtistSongsType, index) => (
                            <div
                                key={index}
                                className={`group flex items-center gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer ${artistSong.songId === songId ? "bg-muted/50" : ""}`}
                            >
                                <div className="w-8 flex items-center justify-center">
                                    <span className={`text-sm text-muted-foreground group-hover:hidden ${artistSong.songId === songId ? "hidden" : ""}`}>{index + 1}</span>
                                    <Button
                                        variant="ghost" size="icon" className={`h-6 w-6 hidden group-hover:flex ${artistSong.songId === songId ? "flex" : ""}`}
                                        onClick={() => {
                                            setSongId(artistSong.songId)
                                        }}
                                    >
                                        {songId === artistSong.songId ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                                    </Button>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium truncate">{artistSong.title}</h3>
                                    {/* <p className="text-sm text-muted-foreground">{artistSong.plays} plays</p> */}
                                </div>

                                <div className="text-sm text-muted-foreground">{formatTime(artistSong.durationSeconds)}</div>

                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Albums</h2>
                    <div className="space-y-4">
                        {artistAlbums.map((album: AlbumType, index) => (
                            <Card key={index} className="group cursor-pointer hover:shadow-md transition-all">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 flex-shrink-0">
                                            <Image
                                                src={`/${album.coverArtUrl}`}
                                                alt={album.title}
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium truncate">{album.title}</h3>
                                            <p className="text-sm text-muted-foreground">{album.releaseDate}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Play className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArtistSongsAlbums