import React from "react";
import messageBus from "../utils/MessageBus";
import Scrollable from "./Scrollable";
import { SongList } from "../icons/";

export default function Lyrics({ lyrics, height, showSonglist, toggleShowSonglist }) {
    const [index, setIndex] = React.useState(0);
    const [scrollTop, setScrollTop] = React.useState(0);
    const lineHeight = React.useRef(null);
    const lyricsListRef = React.useRef(null);

    React.useEffect(function () {
        lineHeight.current = lyricsListRef.current.scrollHeight / lyrics.length;

        function handler(msg) {
            const highlightedIndex = lyrics.findIndex(({ time }) => time > msg) - 1;
            setIndex(highlightedIndex);
            setScrollTop(highlightedIndex * lineHeight.current);
        }

        messageBus.subscribe("audioTimeUpdate", handler);

        return function () {
            messageBus.unSubscribe("audioTimeUpdate", handler);
        };
    }, []);

    return (
        <Scrollable
            className={`relative flex w-full px-4 text-center text-white transition-all duration-1000 laptop:w-2/4 laptop:grow-0 laptop:pl-0 desktop:w-3/5 ${!showSonglist && "laptop:w-3/4 desktop:w-4/5"}`}
            showScroller={false}
            scrollTop={scrollTop}>
            <div className="absolute bottom-0 left-1 top-0 my-auto hidden h-8 w-8 items-center justify-center bg-[#0f0f0f] laptop:flex" onClick={toggleShowSonglist}>
                <SongList />
            </div>

            <div style={{ height }} />
            <div ref={lyricsListRef}>
                {lyrics.map(({ words }, i) => (
                    <p key={i} className={`mb-6 transition-all duration-300 ${index === i ? "mt-4 text-2xl font-medium text-white" : "text-gray-500"}`}>
                        {words}
                    </p>
                ))}
            </div>
            <div style={{ height }} />
        </Scrollable>
    );
}
