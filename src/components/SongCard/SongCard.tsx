import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'

interface SongCardProps { 
    index: number,
    setCurrentSongId: React.Dispatch<React.SetStateAction<string>>,
    songId: string,
    songTitle: string,
}

const SongCard: React.FC<SongCardProps> = ({
    index,
    setCurrentSongId, 
    songId, 
    songTitle
}) => {

    return (
        <>
            <Card className="w-fit shadow-md">
                <CardContent className="py-6">
                    <div className='flex flex-col gap-y-2 items-start'>
                        <Image className="mx-auto rounded-lg shadow-md" src={'/nevermind.jpeg'} alt={'sample song'} width={240} height={50} />
                        <h1 className="text-md font-bold overflow-auto">{songTitle} </h1>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button 
                        className="w-full"
                        onClick={() => {
                            setCurrentSongId(songId)
                            console.log(songId)
                        }}
                    >Play this song</Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default SongCard