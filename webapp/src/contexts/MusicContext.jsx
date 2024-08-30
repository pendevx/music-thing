import React from "react";
import localStorageRepository, { keys } from "../repositories/LocalStorageRepository";
import createPRNG from "../utils/pseudo-rng";
import { playBehaviours } from "../utils/playBehaviour";

export const MusicContext = React.createContext();

const randomSeed = () => Math.floor(Math.random() * 2 ** 16);

export default function MusicProvider({ children, musicList }) {
    const [currentSong, setCurrentSong] = React.useState({ name: 0 });
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [playBehaviour, _setPlayBehaviour] = React.useState(localStorageRepository.get(keys.PLAY_BEHAVIOUR));
    const shuffleInfo = React.useRef({
        seed: null,
        playOrder: null,
        init: false,
    });
    const init = React.useRef(false);

    const currentSongIndex = () => +localStorageRepository.get(keys.LAST_SONG_ID);

    React.useEffect(function () {
        const lastSongIndex = currentSongIndex();

        if (playBehaviour === "shuffle") {
            const seed = localStorageRepository.get(keys.SEED) || randomSeed();
            shuffleSongs(seed);
        } else {
            shuffleInfo.current.playOrder = [...musicList];
        }

        init.current = true;

        setCurrentSong({ id: lastSongIndex ? shuffleInfo.current.playOrder[lastSongIndex] : "" });
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

    // function selectSongByKey(key) {
    //     const index = shuffleInfo.current.playOrder.findIndex(x => x === key);

    //     if (index === -1) {
    //         throw new Error("Invalid song key");
    //     }

    //     selectSong(key, index);
    // }

    function selectSongByIndex(index) {
        const song = shuffleInfo.current.playOrder[index];

        if (index < 0 || index >= shuffleInfo.current.playOrder.length) {
            throw new Error("Invalid song index");
        }

        selectSong(song.name, song.id);
    }

    function selectSongById(id) {
        const index = shuffleInfo.current.playOrder.findIndex(x => x.id === id);

        if (index === -1) {
            throw new Error("Invalid song id");
        }

        selectSong(shuffleInfo.current.playOrder[index].name, id);
    }

    function selectSong(name, id) {
        setCurrentSong({ name, id });
        setIsPlaying(true);
        localStorageRepository.set(keys.LAST_SONG_ID, id);
    }

    function setPlayBehaviour(behaviour) {
        if (!playBehaviours.includes(behaviour)) {
            throw new Error("Invalid playBehaviour");
        }

        if (behaviour === "shuffle") {
            shuffleSongs(randomSeed());
        }

        localStorageRepository.set(keys.PLAY_BEHAVIOUR, behaviour);
        _setPlayBehaviour(behaviour);
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
                selectSongById,
                play,
                pause,
            }}>
            {children}
        </MusicContext.Provider>
    );
}
