import React from "react";
import { keys } from "../repositories/LocalStorageRepository";
import createPRNG from "../utils/pseudo-rng";
import { playBehaviours } from "../utils/playBehaviour";
import { useStoreRef, useStoreState } from "../hooks/useStore";
import useFetch from "../hooks/useFetch";
import { listSongs } from "../utils/url-builder.api";

export const MusicContext = React.createContext();

const randomSeed = () => Math.floor(Math.random() * 2 ** 16);

export default function MusicProvider({ children }) {
    const [currentSong, setCurrentSong] = React.useState({ name: "", index: -1 });
    const [currentSongId, setCurrentSongId] = useStoreState(keys.CURRENT_SONG_ID, Number);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const { data: musicList, refreshData } = useFetch([]);
    const [playBehaviour, updatePlayBehaviour] = useStoreState(keys.PLAY_BEHAVIOUR, String);
    const shuffleSeed = useStoreRef(keys.SEED, Number);
    const playOrder = React.useMemo(
        function () {
            if (playBehaviour === "shuffle") {
                const prng = createPRNG(shuffleSeed.current);
                return [...musicList].sort(() => prng.next().value / 2 ** 31 - 0.5);
            }

            return musicList;
        },
        [musicList, playBehaviour, shuffleSeed]
    );

    React.useEffect(function () {
        refreshData(listSongs());
    }, []);

    function previous() {
        const index = (currentSong.index - 1 + playOrder.length) % playOrder.length || 0;
        selectSongByIndex(index);
    }

    function next() {
        const index = (currentSong.index + 1) % playOrder.length || 0;
        selectSongByIndex(index);
    }

    function selectSongByIndex(index) {
        const song = playOrder[index];

        if (index < 0 || index >= playOrder.length) {
            throw new Error("Invalid song index");
        }

        selectSong(song.name, song.id, index);
    }

    function selectSongById(id) {
        const index = playOrder.findIndex(x => x.id === id);

        if (index === -1) {
            throw new Error("Invalid song id");
        }

        selectSong(playOrder[index].name, id, index);
    }

    function selectSong(name, id, index, play = true) {
        setCurrentSong({ name, index });
        setCurrentSongId(id);
        setIsPlaying(play);
    }

    function setPlayBehaviour(behaviour) {
        if (!playBehaviours.includes(behaviour)) {
            throw new Error("Invalid playBehaviour");
        }

        if (behaviour === "shuffle") {
            shuffleSeed.current = randomSeed();
        }

        updatePlayBehaviour(behaviour);
    }

    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);

    if (currentSong.index === -1) {
        if (playBehaviour === "shuffle") {
            shuffleSeed.current ||= randomSeed();
        }

        if (playOrder.length) {
            if (!currentSongId) {
                selectSong(playOrder[0]?.name || "", playOrder[0]?.id, 0, false); // default to first song in the list
            } else {
                selectSongById(currentSongId);
            }
        }
    }

    return (
        <MusicContext.Provider
            value={{
                currentSong,
                currentSongId,
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
