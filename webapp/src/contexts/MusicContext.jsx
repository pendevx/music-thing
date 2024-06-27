import React from "react";

export const MusicContext = React.createContext();

export default function MusicProvider({ children }) {
    const [ currentSong, setCurrentSong ] = React.useState({ key: null });
    const [ isPlaying, setIsPlaying ] = React.useState(false);

    return (
        <MusicContext.Provider value={{
            currentSong,
            setCurrentSong,
            isPlaying,
            setIsPlaying,
        }}>
            {children}
        </MusicContext.Provider>
    )
}
