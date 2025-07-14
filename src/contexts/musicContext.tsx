"use client"
import React, { createContext, useState } from "react";

interface MusicStateContextProps {
    songId: string,
    setSongId: React.Dispatch<React.SetStateAction<string>>
}

export const MusicStateContext = createContext<MusicStateContextProps | null>(null);

export const MusicStateContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [songId, setSongId] = useState<string>("");
    return (
        <MusicStateContext.Provider value={{songId, setSongId}}>
            {children}
        </MusicStateContext.Provider>
    )
}