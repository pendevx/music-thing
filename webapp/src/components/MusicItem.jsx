import React from "react";
import { MusicContext } from "../contexts/MusicContext";

export default function MusicItem({ name, onClick, index, id }) {
    const musicContext = React.useContext(MusicContext);

    return (
        <div className="cursor-pointer" onClick={() => onClick(index)}>
            <a className={`block pt-2 pb-2 pl-4 bg-[#363636] hover:bg-[#5e5e5e] transition-colors duration-200 ${musicContext.currentSong.etag === id ? "bg-[#5e5e5e] text-[#f2b200]" : ""}`}
            >
                {name}
            </a>
        </div>
    );
}
