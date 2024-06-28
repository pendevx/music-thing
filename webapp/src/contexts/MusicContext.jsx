import React from "react";
import repository, { keys } from "../repositories/LocalStorageRepository";

export const MusicContext = React.createContext();

export default function MusicProvider({ children, musicList }) {
    const [currentSong, setCurrentSong] = React.useState({ 
        key: null,
        index: null
    });
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [playBehaviour, _setPlayBehaviour] = React.useState(repository.get(keys.PLAY_BEHAVIOUR));

    function nextSong() {
        let nextIndex;

        if (playBehaviour === "loop") {
            nextIndex = currentSong.index;
        } else if (playBehaviour === "shuffle") {
            nextIndex = Math.floor(Math.random() * musicList.length);
        } else if (playBehaviour == null) {
            nextIndex = (currentSong.index + 1) % musicList.length;
        } else {
            // should never enter this path
            throw new Error("Invalid playBehaviour or developer is just bad");
        }

        chooseSong(nextIndex);
    }

    function chooseSong(index) {
        if (index < 0 || index >= musicList.length) {
            throw new Error("Invalid song key or index");
        }

        const key = musicList[index].key;

        setCurrentSong({ key, index });
        setIsPlaying(true);
    }

    function setPlayBehaviour(behaviour) {
        const allowed = ["loop", "shuffle", null];

        if (!allowed.includes(behaviour)) {
            throw new Error("Invalid playBehaviour");
        }

        repository.set(keys.PLAY_BEHAVIOUR, behaviour);
        _setPlayBehaviour(behaviour);
    }

    return (
        <MusicContext.Provider value={{
            currentSong,
            isPlaying,
            setIsPlaying,
            playBehaviour,
            setPlayBehaviour,
            nextSong,
            musicList,
            chooseSong
        }}>
            {children}
        </MusicContext.Provider>
    )
}
