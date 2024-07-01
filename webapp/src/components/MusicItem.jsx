import React from "react";
import { MusicContext } from "../contexts/MusicContext";

export default function MusicItem({ name, onClick, index, id }) {
    const musicContext = React.useContext(MusicContext);
    const amIPlaying = musicContext.currentSong.etag === id;

    return (
        <li className="cursor-pointer" onClick={() => onClick(index)}>
            <a className={`block pt-2 pb-2 pl-4 hover:bg-[#2b2b2b] hover:text-white text-[#7c7c7c] transition-colors duration-200
                ${amIPlaying ? "bg-[#2b2b2b] hover:bg-[#555555] text-[#ffc421] hover:text-[#ffc421]" : ""}`}
            >
                {name}
            </a>
        </li>
    );
}
