"use client"
import React, { useEffect, useState } from 'react'
import { formatTime, SongType } from '../AudioPlayerFooter/AudioPlayerFooter'
import axios from 'axios'
import { Button } from '../ui/button'
import { Heart, MoreHorizontal, Pause, Play } from 'lucide-react'
import Image from 'next/image'
import useMusicStateData from '@/hooks/useMusicStateData'
import { Card, CardContent } from '../ui/card'
import { artistType } from '../ArtistsList/ArtistsList'
import { useRouter } from 'next/navigation'

interface GenreSongsAlbumsProps {
    genreId: string
}

const GenreSongsAlbums: React.FC<GenreSongsAlbumsProps> = ({ genreId }) => {

    return (
        <>
            <div className="space-y-12">
                <GenreArtists genreId={genreId} />
                <GenreSongs genreId={genreId} />
            </div>
        </>
    )
}

export default GenreSongsAlbums

const GenreArtists: React.FC<GenreSongsAlbumsProps> = ({ genreId }) => {
    const [Artists, setArtists] = useState<artistType[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/genres/${genreId}/artists`)
                setArtists(res.data)
            } catch (error) {
                console.log("Some error occurred while fetching the artists: " + error);
            }
        }
        fetchArtists()
    })

    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Featured Artists</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Artists.map((artist: artistType) => (
                    <Card key={artist.artistId} className="group cursor-pointer hover:shadow-lg transition-all">
                        <CardContent className="p-4 text-center space-y-3">
                            <div className="relative aspect-square overflow-hidden rounded-full">
                                <Image
                                    src={artist.imageUrl || "/placeholder-1.svg"}
                                    alt={artist.name}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                            </div>
                            <div>
                                <h3
                                    className="font-medium truncate" 
                                    onClick={() => router.push(`/artist/${artist.artistId}`)}>
                                        {artist.name}
                                </h3>
                                {/* <p className="text-sm text-muted-foreground">{artist.followers} followers</p> */}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

const GenreSongs: React.FC<GenreSongsAlbumsProps> = ({ genreId }) => {
    const [genreSongs, setGenreSongs] = useState<SongType[]>([])
    const { songId, setSongId } = useMusicStateData()

    useEffect(() => {
        const fetchGenreSongs = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/genres/${genreId}/songs`);
                setGenreSongs(response.data);
            } catch (error) {
                console.error('Error fetching genre songs:', error);
            }
        };
        fetchGenreSongs();
    }, [])

    return (
        <>
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Popular Tracks</h2>
                <div className="space-y-2">
                    {genreSongs.map((song: SongType, index) => (
                        <div
                            key={song.songId}
                            className={`group flex items-center gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer ${song.songId === songId ? "bg-muted/50" : ""}`}
                        >
                            <div className="w-8 flex items-center justify-center">
                                <span className={`text-sm text-muted-foreground group-hover:hidden ${song.songId === songId ? "hidden" : ""}`}>{index + 1}</span>
                                <Button
                                    variant="ghost" size="icon" className={`h-6 w-6 hidden group-hover:flex ${song.songId !== songId ? "hidden" : "flex"}`}
                                    onClick={() => setSongId(song.songId)}
                                >
                                    {song.songId === songId ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                                </Button>
                            </div>

                            <div className="relative w-12 h-12 flex-shrink-0">
                                <Image
                                    src={"/placeholder-1.svg"}
                                    alt={song.title}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">{song.title}</h3>
                                {/* <p className="text-sm text-muted-foreground truncate">{song.songId}</p> */}
                            </div>

                            {/* <div className="text-sm text-muted-foreground hidden sm:block">{track.plays} plays</div> */}

                            <div className="text-sm text-muted-foreground">{formatTime(song.durationSeconds)}</div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Heart className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}