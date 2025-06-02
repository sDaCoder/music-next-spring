'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import useSound from 'use-sound'
import Image from 'next/image'

const PlayerArea = () => {

    const [play, { pause, duration, sound }] = useSound('/demo-song.mp3')
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [audioTime, setAudioTime] = useState<{ hr: number, min: number, sec: number }>({ hr: 0, min: 0, sec: 0 })
    const [seconds, setSeconds] = useState<number>(0)

    useEffect(() => {
        const sec = duration ? duration / 1000 : 0;
        const min = Math.floor(sec / 60);
        const secRemain = Math.floor(sec % 60);
        const hr = Math.floor(min / 60);
        const minRemain = Math.floor(min % 60);
        const time: { hr: number, min: number, sec: number } = {
            hr, min: minRemain, sec: secRemain
        }
        console.log(time);
    }, [duration])

    useEffect(() => {
        const interval: NodeJS.Timeout = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                const hr = Math.floor(min / 60);
                setAudioTime({ hr, min, sec });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [sound])
    console.log(audioTime);
    

    const playButton = () => {
        if (isPlaying) {
            pause()
            setIsPlaying(false)
        }
        else {
            play()
            setIsPlaying(true)
        }
    }


    return (
        <>
            <Card className='w-80 mx-auto shadow-md'>
                <CardHeader>
                    <h1 className='font-bold text-2xl text-center'>Music name</h1>
                </CardHeader>
                <CardContent>
                    <Image className='mx-auto rounded-lg shadow-md' src={'/demo-img.jpg'} width={300} height={200} alt='album cover' />
                </CardContent>
                <CardFooter>
                    {/* <div>{audioTime.min}:{audioTime.sec}</div> */}
                    <div className='flex flex-col w-full gap-4'>
                        <input
                            title='slider'
                            type="range"
                            min="0"
                            max={duration ? duration / 1000 : 0}
                            value={seconds}
                            className=""
                            onChange={(e) => {
                                sound.seek([e.target.value]);
                            }}
                        />
                        <div className='mx-auto flex gap-4 items-center'>
                            <Button variant={'outline'} className='rounded-full py-6'>
                                <SkipBack />
                            </Button>
                            <Button
                                className='rounded-full py-6'
                                onClick={playButton}
                            >
                                {isPlaying ? <Pause /> : (
                                    <Play />
                                )}
                            </Button>
                            <Button variant={'outline'} className='rounded-full py-6'>
                                <SkipForward />
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

export default PlayerArea