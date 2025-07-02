import Image from "next/image";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Maximize2, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@radix-ui/react-slider";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import axios from "axios";

interface PlayerFooterProps {
    currentSongId: string
}

const PlayerFooter: React.FC<PlayerFooterProps> = ({currentSongId}) => {

    const [sliderValue, setSliderValue] = useState(0)
    const [volume, setVolume] = useState<number>(0.5)
    const [currentSong, setCurrentSong] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        const fetchSong = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/songs/${currentSongId}`)
                setCurrentSong(res.data.fileUrl);
                console.log(res.data.fileUrl);
            } catch (error) {
                setCurrentSong('')
            } finally {
                setLoading(false)
            }
        }
        fetchSong()
    }, [currentSongId])
    
    const [play, { pause, duration, sound }] = useSound(
        currentSong || '',
        { volume: volume }
    )
    

    const togglePlayButton = () => {
        if (isPlaying) {
            pause()
            setIsPlaying(false)
        }
        else {
            play()
            setIsPlaying(true)
        }
    }

    if (loading) {
        return (
            <footer className="absolute bottom-4 w-full px-4">
                <Card className="p-3 shadow-lg rounded-2xl text-center">Loading song...</Card>
            </footer>
        )
    }

    if (!currentSong) {
        return (
            <footer className="absolute bottom-4 w-full px-4">
                <Card className="p-3 shadow-lg rounded-2xl text-center">Song not found.</Card>
            </footer>
        )
    }

    return (
        <>
            <footer className="absolute bottom-4 w-full px-4 ">
                <Card className="p-3 shadow-lg rounded-2xl">
                    <div className="flex justify-between px-2">
                        
                        <div className="flex gap-4 items-start">
                            <Image className="hidden md:block rounded-sm" src={'/nevermind.jpeg'} alt={'sample song'} width={100} height={100} />
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold">Chauba Chauba</h1>
                                <h2 className="">Taran Aujla</h2>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <div className="flex items-center gap-x-2">
                                <p>{duration ? 200 - duration / 1000 : 0}</p>
                                {/* <input
                                    title='slider'
                                    type="range"
                                    min="0"
                                    max={200}
                                    value={sliderValue}
                                    className="w-[400px] bg-black"
                                    onChange={(e) => {
                                        // sound.seek([e.target.value]);
                                        console.log(e.target.value);
                                        setSliderValue(Number(e.target.value))
                                    }}
                                /> */}
                                <Slider
                                    defaultValue={[0]} 
                                    value={[sliderValue]} 
                                    min={0}
                                    max={duration ? duration / 1000 : 200} 
                                    step={1} 
                                    className="w-[30vw]"
                                    onValueChange={(e) => {
                                        setSliderValue(e[0])
                                        if (sound) sound.seek(e[0])
                                    }} 
                                />
                                <p>{duration ? Math.round(duration / 1000) : 0}</p>
                            </div>
                            <div className='mx-auto flex gap-4 items-center'>
                                <Button variant={'outline'} className='rounded-full py-6'>
                                    <SkipBack />
                                </Button>
                                <Button
                                    className='rounded-full py-6'
                                    onClick={togglePlayButton}
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
                                <Button variant={'outline'} className='rounded-full'>
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

export default PlayerFooter