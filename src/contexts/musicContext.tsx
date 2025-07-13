"use client"
import React, { createContext, useState } from "react";

interface StateContextProps {
    songId: string,
    setSongId: React.Dispatch<React.SetStateAction<string>>
}

export const StateContext = createContext<StateContextProps | null>(null);

export const StateContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [songId, setSongId] = useState<string>("");
    return (
        <StateContext.Provider value={{songId, setSongId}}>
            {children}
        </StateContext.Provider>
    )
}