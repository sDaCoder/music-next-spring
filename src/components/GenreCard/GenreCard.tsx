import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Mic2 } from 'lucide-react'
import { GenreType } from '../GenresList/GenresList'

interface GenreCardProps {
    // bgColor: string
    bgColorIndex: number
    genre: GenreType
}

export const bgColors = [
    "from-pink-400 to-purple-600",
    "from-red-500 to-orange-600",
    "from-yellow-400 to-orange-500",
    "from-blue-400 to-cyan-600",
    "from-green-400 to-teal-600",
    "from-purple-400 to-indigo-600",
]

const GenreCard: React.FC<GenreCardProps> = ({ bgColorIndex, genre }) => {
    return (
        <>
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                    <div className={`bg-gradient-to-br ${bgColors[bgColorIndex]} aspect-square flex items-center justify-center relative`}>
                        <Mic2 className="h-12 w-12 text-white/90" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    </div>
                    <div className="p-4">
                        <h4 className="font-medium text-center">{genre.name}</h4>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default GenreCard