import React from "react";
import localStorageRepository, { keys } from "../repositories/LocalStorageRepository";
import createPRNG from "../utils/pseudo-rng";

export const MusicContext = React.createContext();

export default function MusicProvider({ children, musicList }) {
    const [currentSong, setCurrentSong] = React.useState({
        key: null,
        index: null,
    });
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [playBehaviour, _setPlayBehaviour] = React.useState(localStorageRepository.get(keys.PLAY_BEHAVIOUR));
    const shuffleState = React.useRef({
        seed: localStorageRepository.get(keys.SEED),
        playOrder: [],
        currentIndex: -1,
    });
    const prng = React.useRef(createPRNG());

    function next() {
        let nextIndex;

        if (currentSong.index == null) {
            nextIndex = 0;
        } else if (playBehaviour === "shuffle") {
            nextIndex = Math.floor(Math.random() * musicList.length);
        } else if (playBehaviour == null) {
            nextIndex = (currentSong.index + 1) % musicList.length;
        } else if (playBehaviour === "loop") {
            // should never enter this path
            throw new Error("Invalid playBehaviour or developer is just bad");
        }

        selectSongAndPlay(nextIndex);
    }

    function selectSongAndPlay(index) {
        if (index < 0 || index >= musicList.length) {
            throw new Error("Invalid song key or index");
        }

        const key = musicList[index];

        setCurrentSong({ key, index });
        setIsPlaying(true);
    }

    function setPlayBehaviour(behaviour) {
        const allowed = ["loop", "shuffle", null];

        if (!allowed.includes(behaviour)) {
            throw new Error("Invalid playBehaviour");
        }

        localStorageRepository.set(keys.PLAY_BEHAVIOUR, behaviour);
        _setPlayBehaviour(behaviour);
    }

    function play() {
        setIsPlaying(true);
    }

    function pause() {
        setIsPlaying(false);
    }

    function songName() {
        if (currentSong.index == null) {
            return null;
        }

        const regex = /\/([^/]+)$/;
        const name = regex.exec(currentSong.key)[1];

        return name;
    }

    return (
        <MusicContext.Provider
            value={{
                currentSong,
                isPlaying,
                playBehaviour,
                setPlayBehaviour,
                next,
                musicList,
                selectSongAndPlay,
                play,
                pause,
                songName,
            }}>
            {children}
        </MusicContext.Provider>
    );
}
