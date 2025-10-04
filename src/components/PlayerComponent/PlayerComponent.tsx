"use client"
import React from 'react'
import AudioPlayerFooter from '../AudioPlayerFooter/AudioPlayerFooter'
import useMusicStateData from '@/hooks/useMusicStateData'

const PlayerComponent = () => {
    const { songId } = useMusicStateData()
    return (
        <>
            {songId !== "" && <AudioPlayerFooter currentSongId={songId} />}
        </>
    )
}

export default PlayerComponent