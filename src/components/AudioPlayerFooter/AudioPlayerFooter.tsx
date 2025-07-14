"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Card } from '../ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Maximize2, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
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

interface SongType {
    songId: string,
    title: string,
    durationSeconds: number,
    url: string,
    fileUrl: string,
    artistId: string,
    albumId: string
}

const AudioPlayerFooter: React.FC<AudioPlayerFooterProps> = ({ currentSongId }) => {

    // const songs = [
    //     'demo-song.mp3',
    //     'Nirvana-In-Bloom.mp3',
    //     'Nirvana - Lithium.mp3',
    //     'Daft Punk - High Life.mp3',
    // ]

    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [volume, setVolume] = useState<number>(0.5);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [currentSong, setCurrentSong] = useState<SongType | null>(null)

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const fetchSong = async () => {
            const res = await axios.get(`http://localhost:8080/api/songs/${currentSongId}`)
            setCurrentSong(res.data);
        }
        fetchSong()
    }, [currentSongId])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume, currentSongId]);

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

    return (
        <>
            <audio ref={audioRef} src={`/${currentSong?.url}`} autoPlay={isPlaying} />
            <footer className='fixed bottom-4 w-full px-4 h-[18vh]'>
                <Card className="p-3 shadow-lg rounded-2xl">
                    <div className='flex justify-between'>

                        <div className="flex gap-4 items-start">
                            <Image className="hidden md:block rounded-sm" src={'/nevermind.jpeg'} alt={'sample song'} width={100} height={100} />
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold">{currentSong?.title}</h1>
                                <h2 className="">Taran Aujla</h2>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-4 items-center justify-center">
                            <div className='flex items-center gap-x-2'>
                                <p className='font-mono'>{formatTime(currentTime)}</p>
                                <Slider
                                    defaultValue={[0]}
                                    value={[currentTime]}
                                    min={0}
                                    max={duration}
                                    step={1}
                                    className="w-[30vw]"
                                    onValueChange={seekAudio}
                                />
                                <p className='font-mono'>{formatTime(duration)}</p>
                            </div>

                            <div className='mx-auto flex gap-4 items-center'>
                                <Button variant={'outline'} className='rounded-full py-6'>
                                    <SkipBack />
                                </Button>
                                <Button
                                    className='rounded-full py-6'
                                    onClick={() => {
                                        if (audioRef.current) {
                                            if (isPlaying) {
                                                audioRef.current.pause();
                                            } else {
                                                audioRef.current.play();
                                            }
                                        }
                                        setIsPlaying(!isPlaying);
                                    }}
                                >
                                    {isPlaying ? <Pause /> : <Play />}
                                </Button>
                                <Button variant={'outline'} className='rounded-full py-6'>
                                    <SkipForward />
                                </Button>
                            </div>
                        </div>

                        <div>
                            {/* <h1>Song Audio Controls</h1> */}
                            <div className="flex items-center gap-x-2">
                                <Button
                                    size={'icon'}
                                    variant={'outline'}
                                    className='rounded-full'
                                    onClick={() =>
                                        volume === 0 ? setVolume(0.5) : setVolume(0)}
                                >
                                    {volume !== 0 ? <VolumeX /> : <Volume2 />}
                                    {/* <VolumeX /> */}
                                </Button>
                                <Slider
                                    defaultValue={[volume]}
                                    value={[volume]}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    className="w-[15vw]"
                                    onValueChange={(e) => {
                                        setVolume(e[0])
                                    }}
                                />
                                <Button size={'icon'} variant={'outline'} className='rounded-full'>
                                    <Maximize2 />
                                </Button>
                            </div>
                        </div>

                    </div>
                </Card>
            </footer>
        </>
    )
}

export default AudioPlayerFooter