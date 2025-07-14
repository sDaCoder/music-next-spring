"use client"

import { MusicStateContext } from "@/contexts/musicContext"
import { useContext } from "react"

const useMusicStateData = () => {
    const context = useContext(MusicStateContext)
    if(!context) {
        throw new Error("useMusicStateData must be used within a <MusicStateContextProvider />")
    }
    return context
}

export default useMusicStateData