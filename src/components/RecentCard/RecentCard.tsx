import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Play } from 'lucide-react'
import { Recent } from '../RecentsList/RecentsList'
import useMusicStateData from '@/hooks/useMusicStateData'

interface RecentCardProps {
    recent: Recent
}

const RecentCard: React.FC<RecentCardProps> = ({recent}) => {
    const {setSongId} = useMusicStateData()
    return (
        <>
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 space-y-3">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                        <Image
                            src={"/demo-img.jpg"}
                            alt={recent.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                                size="icon"
                                className="rounded-full"
                                onClick={() => setSongId(recent.songId)}
                            >
                                <Play className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-medium truncate">{recent.title}</h4>
                        {/* <p className="text-sm text-muted-foreground truncate">{album.artist}</p> */}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default RecentCard