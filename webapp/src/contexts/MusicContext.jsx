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
        seed: null,
        playOrder: null,
        // currentIndex: -1,
    });

    React.useEffect(function () {
        if (!playBehaviour === "shuffle") {
            return;
        }

        const seed = localStorageRepository.get(keys.SEED);
        shuffleSongs(seed);
    }, []);

    function shuffleSongs(seed) {
        const prng = createPRNG(seed);

        const newPlayOrder = [...musicList].sort(() => prng.next().value / 2 ** 31 - 0.5);
        shuffleState.current = {
            seed,
            playOrder: newPlayOrder,
            // currentIndex: newPlayOrder.findIndex(x => x === currentSong.key),
        };

        localStorageRepository.set(keys.SEED, seed);

        console.log(shuffleState.current);
    }

    function next() {
        const nextKey = currentSong.index == null ? shuffleState.current.playOrder[0] : shuffleState.current.playOrder[currentSong.index + 1];

        selectSongAndPlay(nextKey);
    }

    function selectSongAndPlay(key) {
        const index = shuffleState.current.playOrder.findIndex(x => x === key);

        if (index === -1) {
            throw new Error("Invalid song key or index");
        }

        setCurrentSong({ key, index });
        setIsPlaying(true);
    }

    function setPlayBehaviour(behaviour) {
        const allowed = ["loop", "shuffle", null];

        if (!allowed.includes(behaviour)) {
            throw new Error("Invalid playBehaviour");
        }

        if (behaviour === "shuffle") {
            shuffleSongs(Math.floor(Math.random() * 2 ** 16));
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
