import React from "react";
import { MusicContext } from "../contexts/MusicContext";

export default function MusicItem({ fileKey, onClick, index }) {
    const ref = React.useRef(null);
    const musicContext = React.useContext(MusicContext);
    const amIPlaying = musicContext.currentSong.key === fileKey;

    function handleClick(e) {
        onClick(index);
        e.currentTarget.blur();
    }

    return (
        <li onClick={handleClick} ref={ref}>
            <button
                className={`block cursor-pointer overflow-hidden text-nowrap pb-2 pl-4 pt-2 text-[#7c7c7c] transition-colors duration-200 hover:bg-[#2b2b2b] hover:text-white ${amIPlaying ? "bg-[#2b2b2b] text-[#ffc421] mobile:hover:bg-[#2b2b2b] mobile:hover:text-[#ffc421] laptop:hover:bg-[#555555] laptop:hover:text-[#ffc421]" : ""}`}>
                {/\/(?<filename>.*)$/gi.exec(fileKey)?.groups?.filename}
            </button>
        </li>
    );
}
