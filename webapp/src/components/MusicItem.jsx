import React from "react";
import { MusicContext } from "../contexts/MusicContext";

export default function MusicItem({ name, onClick, index, id }) {
    const ref = React.useRef(null);
    const musicContext = React.useContext(MusicContext);
    const amIPlaying = musicContext.currentSong.etag === id;

    function handleClick(e) {
        onClick(index);
        e.currentTarget.blur();
    }

    return (
        <li onClick={handleClick} ref={ref}>
            <button className={`block pt-2 pb-2 pl-4 hover:bg-[#2b2b2b] hover:text-white text-[#7c7c7c] transition-colors duration-200 cursor-pointer text-nowrap overflow-hidden
                ${amIPlaying ? "bg-[#2b2b2b] mobile:hover:bg-[#2b2b2b] laptop:hover:bg-[#555555] text-[#ffc421] mobile:hover:text-[#ffc421] laptop:hover:text-[#ffc421]" : ""}`}
            >
                {name}
            </button>
        </li>
    );
}
