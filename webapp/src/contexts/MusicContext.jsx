import React from "react";
import localStorageRepository, { keys } from "../repositories/LocalStorageRepository";
import createPRNG from "../utils/pseudo-rng";
import { playBehaviours } from "../utils/playBehaviour";
import { useStoreRef, useStoreState } from "../hooks/useStore";
import useFetch from "../hooks/useFetch";
import { listSongs } from "../utils/url-builder.api";

export const MusicContext = React.createContext();

const randomSeed = () => Math.floor(Math.random() * 2 ** 16);

globalThis.thing = [];

export default function MusicProvider({ children }) {
    const [currentSong, setCurrentSong] = React.useState({ name: "", id: null, index: -1 });
    const [isPlaying, setIsPlaying] = React.useState(false);
    const { data: musicList, refreshData } = useFetch([]);
    const [ playBehaviour, updatePlayBehaviour ] = useStoreState(keys.PLAY_BEHAVIOUR);
    const shuffleSeed = useStoreRef(keys.SEED);
    const playOrder = React.useRef([...musicList]);

    React.useEffect(function() {
        refreshData(listSongs());
    }, []);

    function shuffleSongs(seed) {
        const prng = createPRNG(seed);
        const newPlayOrder = [...musicList].sort(() => prng.next().value / 2 ** 31 - 0.5);

        playOrder.current = newPlayOrder;
        shuffleSeed.current = seed;
    }

    function previous() {
        const index = (currentSong.index - 1 + playOrder.current.length) % playOrder.current.length || 0;
        selectSongByIndex(index);
    }

    function next() {
        const index = (currentSong.index + 1) % playOrder.current.length || 0;
        selectSongByIndex(index);
    }

    function selectSongByIndex(index) {
        const song = playOrder.current[index];

        if (index < 0 || index >= playOrder.current.length) {
            throw new Error("Invalid song index");
        }

        selectSong(song.name, song.id, index);
    }

    function selectSongById(id) {
        const index = playOrder.current.findIndex(x => x.id === id);

        if (index === -1) {
            throw new Error("Invalid song id");
        }

        selectSong(playOrder.current[index].name, id, index);
    }

    function selectSong(name, id, index) {
        setCurrentSong({ name, id, index });
        setIsPlaying(true);
        localStorageRepository.set(keys.CURRENT_SONG_ID, id);
    }

    function setPlayBehaviour(behaviour) {
        if (!playBehaviours.includes(behaviour)) {
            throw new Error("Invalid playBehaviour");
        }

        if (behaviour === "shuffle") {
            shuffleSongs(randomSeed());
        }

        updatePlayBehaviour(behaviour);
    }

    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);

    if (currentSong.id == null) {
        if (playBehaviour === "shuffle") {
            const seed = shuffleSeed.current || randomSeed();
            shuffleSongs(seed);
        }

        const lastSongId = +localStorageRepository.get(keys.CURRENT_SONG_ID);
        const lastSongIndex = playOrder.current.findIndex(s => s.id === lastSongId);

        if (lastSongId !== 0) {
            setCurrentSong({
                id: lastSongIndex ? playOrder.current[lastSongIndex]?.id : null,
                name: playOrder.current[lastSongIndex]?.name || "",
                index: lastSongId
            });
        }
    }

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
