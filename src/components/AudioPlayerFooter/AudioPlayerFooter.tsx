"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Card } from '../ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ChevronDown, Heart, MoreHorizontal, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '../ui/slider';
import axios from 'axios';

interface AudioPlayerFooterProps {
    currentSongId: string
}

export const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export interface SongType {
    songId: string,
    title: string,
    durationSeconds: number,
    url: string,
    fileUrl: string,
    artistId: string,
    albumId: string
}

// const songs = [
//     'demo-song.mp3',
//     'Nirvana-In-Bloom.mp3',
//     'Nirvana - Lithium.mp3',
//     'Daft Punk - High Life.mp3',
// ]

const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2]

const AudioPlayerFooter: React.FC<AudioPlayerFooterProps> = ({ currentSongId }) => {

    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [volume, setVolume] = useState<number>(0.5);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [currentSong, setCurrentSong] = useState<SongType | null>(null)
    const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
    const [showSpeedControl, setShowSpeedControl] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Fetch the current song
    useEffect(() => {
        const fetchSong = async () => {
            const res = await axios.get(`http://localhost:8080/api/songs/${currentSongId}`)
            setCurrentSong(res.data);
        }
        fetchSong()
    }, [currentSongId])

    // Control the Volumne
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume, currentSongId]);

    // Control the Playback Speed
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackSpeed;
        }
    }, [playbackSpeed, currentSongId]);

    // const changePlaybackSpeed = (speed: number) => {
    //     setPlaybackSpeed(speed);
    //     if (audioRef.current) {
    //         audioRef.current.playbackRate = speed;
    //     }
    // };

    // Control the Current Time
    useEffect(() => {
        const audio: HTMLAudioElement | null = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
        }
    }, [currentSongId])

    const seekAudio = (value: number[]) => {
        if (audioRef.current && value.length > 0) {
            audioRef.current.currentTime = value[0];
            setCurrentTime(value[0]);
        }
    }

    const DURATION_LIMIT = 10; // seconds
    const [hasLogged, setHasLogged] = useState<boolean>(false); // Crossed the 10 seconds

    useEffect(() => {
        setHasLogged(false);
    }, [currentSongId])
    useEffect(() => {
        const addSongToHistory = async () => {
            if (!currentSongId || currentTime <= DURATION_LIMIT || hasLogged) return;
            setHasLogged(true);
            console.log('Song has played for more than 10 seconds.');
            try {
                const res = await axios.post('http://localhost:8080/api/history', {
                    songId: currentSongId,
                    listenedAt: new Date()
                })
                console.log(res);
                console.log("Data added to the database.");
            } catch (error) {
                console.error('Error adding song to history:', error);
            }
        }
        addSongToHistory()
    }, [currentTime, hasLogged]);

    return (
        <>
            <audio ref={audioRef} src={`/${currentSong?.url}`} autoPlay={isPlaying} />
            <Card className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur transition-transform duration-300">

                {/* Drag bar */}
                <div className="flex justify-center py-2 cursor-grab active:cursor-grabbing">
                    <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
                </div>

                <div className='px-4 pb-4'>

                    {/* Mobile View */}
                    <div className="block md:hidden space-y-4">
                        {/* Song Info */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 flex-shrink-0">
                                <Image
                                    src={"/placeholder-1.svg"}
                                    alt={currentSong?.title || "sample song"}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium truncate">{currentSong?.title}</h3>
                                <p className="text-sm text-muted-foreground truncate">{"By " + "Taran Aujla"}</p>
                            </div>
                            <Button className='rounded-full' size="icon" onClick={() => {
                                    if (audioRef.current) {
                                        if (isPlaying) {
                                            audioRef.current.pause();
                                            setIsPlaying(false);
                                        } else {
                                            audioRef.current.play();
                                            setIsPlaying(true);
                                        }
                                    }
                            }}>
                                {isPlaying && !(audioRef.current?.paused) ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                            </Button>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <Slider value={[currentTime]} onValueChange={seekAudio} max={duration} step={1} className="w-full" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{formatTime(currentTime)}</span>
                                <span>{duration && formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    // onClick={toggleShuffle}
                                    // className={isShuffled ? "text-primary" : ""}
                                >
                                    <Shuffle className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <SkipBack className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon">
                                    <SkipForward className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    // onClick={toggleRepeat}
                                    // className={isRepeating ? "text-primary" : ""}
                                >
                                    <Repeat className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Song Info */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                    src={"/placeholder-1.svg"}
                                    alt={"sample song"}
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-xl truncate">{currentSong?.title}</h3>
                                <p className="text-sm text-muted-foreground truncate">{"Taran Aujla"}</p>
                                {/* {currentSong.album && <p className="text-xs text-muted-foreground truncate">{currentSong.album}</p>} */}
                            </div>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon">
                                    <Heart className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Center Controls */}
                        <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                // onClick={toggleShuffle}
                                // className={isShuffled ? "text-primary" : ""}
                                >
                                    <Shuffle className="h-10 w-10" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <SkipBack className="h-10 w-10" />
                                </Button>
                                <Button size="icon" onClick={() => {
                                    if (audioRef.current) {
                                        if (isPlaying) {
                                            audioRef.current.pause();
                                            setIsPlaying(false);
                                        } else {
                                            audioRef.current.play();
                                            setIsPlaying(true);
                                        }
                                    }
                                }} className="h-10 w-10 rounded-full bg-foreground text-background">
                                    {isPlaying && !(audioRef.current?.paused) ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <SkipForward className="h-10 w-10" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                // onClick={toggleRepeat}
                                // className={isRepeating ? "text-primary" : ""}
                                >
                                    <Repeat className="h-10 w-10" />
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 w-full">
                                <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
                                <Slider value={[currentTime]} onValueChange={seekAudio} max={duration} step={1} className="flex-1" />
                                <span className="text-xs text-muted-foreground w-10">{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-2 flex-1 justify-end">

                            {/* Playback Speed */}
                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowSpeedControl(!showSpeedControl)}
                                    className="text-xs"
                                >
                                    {playbackSpeed}x
                                </Button>
                                {showSpeedControl && (
                                    <div className="absolute bottom-full right-0 mb-2 bg-popover border rounded-md shadow-md p-2 space-y-1">
                                        {speedOptions.map((speed) => (
                                            <Button
                                                key={speed}
                                                variant={playbackSpeed === speed ? "default" : "ghost"}
                                                size="sm"
                                                onClick={() => {
                                                    setPlaybackSpeed(speed)
                                                    setShowSpeedControl(false)
                                                }}
                                                className="w-full justify-start text-xs"
                                            >
                                                {speed}x
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Volume Control */}
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={volume === 0 ? () => setVolume(0.5) : () => setVolume(0)}>
                                    {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                                </Button>
                                <Slider value={[volume]} onValueChange={(e) => setVolume(e[0])} max={1} step={0.001} className="w-20" />
                            </div>

                            <Button variant="ghost" size="icon" >
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default AudioPlayerFooter