"use client"

import { StateContext } from "@/contexts/musicContext"
import { useContext } from "react"

export const useStateData = () => {
    const context = useContext(StateContext)
    if(!context) {
        throw new Error("useStateData must be used within a <StateContextProvider />")
    }
    return context
}