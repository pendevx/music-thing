import React from "react";
import { MusicContext } from "../contexts/MusicContext";
import Scrollable from "./Scrollable";
import { MusicItem } from "./";

export default function MusicList({ showSonglist, onSongSelected }) {
    const musicContext = React.useContext(MusicContext);

    function onSongSelect(id) {
        onSongSelected();
        musicContext.selectSongById(id);
    }

    return (
        <Scrollable
            className={`absolute inset-0 z-10 -translate-x-full bg-black px-4 transition-all duration-1000 laptop:relative laptop:flex laptop:w-1/4 laptop:grow-0 laptop:translate-x-0 laptop:pr-0 desktop:w-1/5 ${showSonglist && "translate-x-0"}`}>
            <div className="transition-transform duration-1000">
                <ul>
                    {musicContext.musicList.map(x => (
                        <MusicItem key={x.id} onClick={onSongSelect} id={x.id} isPlaying={musicContext.currentSongId === x.id} name={x.name} />
                    ))}
                </ul>
            </div>
        </Scrollable>
    );
}
