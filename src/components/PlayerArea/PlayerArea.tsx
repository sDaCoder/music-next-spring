'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import useSound from 'use-sound'
import Image from 'next/image'

const PlayerArea = () => {

    const [play, { pause, duration, sound }] = useSound('/demo-song.mp3')
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

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
                    <div className='mx-auto flex gap-4 items-center'>
                        <Button variant={'outline'} className='rounded-full py-6'>
                            <ChevronLeft />
                        </Button>
                        <Button 
                            className='rounded-full py-6'
                            onClick={playButton}
                        >
                            {isPlaying ? <Pause /> : <Play />}
                        </Button>
                        <Button variant={'outline'} className='rounded-full py-6'>
                            <ChevronRight />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

export default PlayerArea