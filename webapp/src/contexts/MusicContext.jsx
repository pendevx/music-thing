import React from "react";
import localStorageRepository, { keys } from "../repositories/LocalStorageRepository";
import createPRNG from "../utils/pseudo-rng";
import { playBehaviours } from "../utils/playBehaviour";

export const MusicContext = React.createContext();

const randomSeed = () => Math.floor(Math.random() * 2 ** 16);

export default function MusicProvider({ children, musicList }) {
    const [currentSong, setCurrentSong] = React.useState({ name: "", id: null, index: -1 });
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [playBehaviour, _setPlayBehaviour] = React.useState(localStorageRepository.get(keys.PLAY_BEHAVIOUR));
    const shuffleInfo = React.useRef({
        seed: null,
        playOrder: null,
    });

    React.useEffect(function () {
        const lastSongIndex = +localStorageRepository.get(keys.LAST_SONG_ID);

        if (playBehaviour === "shuffle") {
            const seed = localStorageRepository.get(keys.SEED) || randomSeed();
            shuffleSongs(seed);
        } else {
            shuffleInfo.current.playOrder = [...musicList];
        }

        setCurrentSong({ 
            id: lastSongIndex ? shuffleInfo.current.playOrder[lastSongIndex].id : "",
            name: shuffleInfo.current.playOrder[lastSongIndex].name,
            index: lastSongIndex
        });
    }, []);

    function shuffleSongs(seed) {
        const prng = createPRNG(seed);
        const newPlayOrder = [...musicList].sort(() => prng.next().value / 2 ** 31 - 0.5);

        shuffleInfo.current = {
            seed,
            playOrder: newPlayOrder,
        };

        localStorageRepository.set(keys.SEED, seed);
    }

    function previous() {
        const index = (currentSong.index - 1 + shuffleInfo.current.playOrder.length) % shuffleInfo.current.playOrder.length;
        selectSongByIndex(index);
    }

    function next() {
        const index = (currentSong.index + 1) % shuffleInfo.current.playOrder.length;
        selectSongByIndex(index);
    }

    function selectSongByIndex(index) {
        const song = shuffleInfo.current.playOrder[index];

        if (index < 0 || index >= shuffleInfo.current.playOrder.length) {
            throw new Error("Invalid song index");
        }

        selectSong(song.name, song.id, index);
    }

    function selectSongById(id) {
        const index = shuffleInfo.current.playOrder.findIndex(x => x.id === id);

        if (index === -1) {
            throw new Error("Invalid song id");
        }

        selectSong(shuffleInfo.current.playOrder[index].name, id, index);
    }

    function selectSong(name, id, index) {
        setCurrentSong({ name, id, index });
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
