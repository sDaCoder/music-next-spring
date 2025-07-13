"use client"
import React from 'react'
import AudioPlayerFooter from '../AudioPlayerFooter/AudioPlayerFooter'
import { useStateData } from '@/hooks/useStateData'

const PlayerComponent = () => {
    const { songId } = useStateData()
    return (
        <>
            {songId !== "" && <AudioPlayerFooter currentSongId={songId} />}
        </>
    )
}

export default PlayerComponent