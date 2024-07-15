import React from "react";
import localStorageRepository, { keys } from "../repositories/LocalStorageRepository";
import createPRNG from "../utils/pseudo-rng";

export const MusicContext = React.createContext();

const randomSeed = () => Math.floor(Math.random() * 2 ** 16);

export default function MusicProvider({ children, musicList }) {
    const [currentSong, setCurrentSong] = React.useState({ key: "" });
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [playBehaviour, _setPlayBehaviour] = React.useState(localStorageRepository.get(keys.PLAY_BEHAVIOUR));
    const shuffleInfo = React.useRef({
        seed: null,
        playOrder: null,
        init: false,
    });
    const init = React.useRef(false);

    const currentSongIndex = () => +localStorageRepository.get(keys.LAST_SONG_INDEX);

    React.useEffect(function () {
        const lastSongIndex = currentSongIndex();

        if (playBehaviour === "shuffle") {
            const seed = localStorageRepository.get(keys.SEED) || randomSeed();
            shuffleSongs(seed);
        } else {
            shuffleInfo.current.playOrder = [...musicList];
        }

        init.current = true;

        setCurrentSong({ key: lastSongIndex ? shuffleInfo.current.playOrder[lastSongIndex] : "" });
    }, []);

    function shuffleSongs(seed) {
        const prng = createPRNG(seed);
        const newPlayOrder = [...musicList].sort(() => prng.next().value / 2 ** 31 - 0.5);

        shuffleInfo.current = {
            ...shuffleInfo.current,
            seed,
            playOrder: newPlayOrder,
        };

        localStorageRepository.set(keys.SEED, seed);
    }

    function previous() {
        const index = (currentSongIndex() - 1 + shuffleInfo.current.playOrder.length) % shuffleInfo.current.playOrder.length;
        selectSongByIndex(index);
    }

    function next() {
        const index = (currentSongIndex() + 1) % shuffleInfo.current.playOrder.length;
        selectSongByIndex(index);
    }

    function selectSongByKey(key) {
        const index = shuffleInfo.current.playOrder.findIndex(x => x === key);

        if (index === -1) {
            throw new Error("Invalid song key");
        }

        selectSong(key, index);
    }

    function selectSongByIndex(index) {
        const key = shuffleInfo.current.playOrder[index];

        if (index < 0 || index >= shuffleInfo.current.playOrder.length) {
            throw new Error("Invalid song index");
        }

        selectSong(key, index);
    }

    function selectSong(key, index) {
        setCurrentSong({ key });
        localStorageRepository.set(keys.LAST_SONG_INDEX, index);
    }

    function setPlayBehaviour(behaviour) {
        const allowed = ["loop", "shuffle", null];

        if (!allowed.includes(behaviour)) {
            throw new Error("Invalid playBehaviour");
        }

        if (behaviour === "shuffle") {
            shuffleSongs(randomSeed());
        }

        localStorageRepository.set(keys.PLAY_BEHAVIOUR, behaviour);
        _setPlayBehaviour(behaviour);
    }

    function songName() {
        if (!init.current || !currentSong.key) {
            return null;
        }

        const regex = /\/([^/]+)$/;
        const name = regex.exec(currentSong.key)[1];

        return name;
    }

    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);

    return (
        <MusicContext.Provider
            value={{
                currentSong,
                isPlaying,
                playBehaviour,
                setPlayBehaviour,
                previous,
                next,
                musicList,
                selectSongByKey,
                selectSongByIndex,
                play,
                pause,
                songName,
            }}>
            {children}
        </MusicContext.Provider>
    );
}
