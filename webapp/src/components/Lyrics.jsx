import React from "react";
import messageBus from "../utils/MessageBus";
import { Scrollable } from "./";
import { ToggleSonglist } from "../icons/";
import { MusicContext } from "../contexts/MusicContext";
import { downloadLyrics } from "../utils/url-builder.api";
import useFetch from "../hooks/useFetch";

const SCROLL_IGNORE_DURATION = 1500;

export default function Lyrics({ height, showSonglist, toggleShowSonglist }) {
    const { data: lyrics, refreshData } = useFetch([]);
    const [index, setIndex] = React.useState(0);
    const [scrollTop, setScrollTop] = React.useState(0);
    const getHeight = React.useCallback(
        el => {
            if (el) setLineHeight(el.scrollHeight / lyrics.length);
        },
        [lyrics]
    );
    const [lineHeight, setLineHeight] = React.useState(0);
    const timerRef = React.useRef(null);
    const musicContext = React.useContext(MusicContext);

    React.useEffect(
        function () {
            function handler(msg) {
                const highlightedIndex = lyrics.findIndex(({ time }) => time > msg);
                const nextIndex = highlightedIndex === -1 ? lyrics.length - 1 : highlightedIndex - 1;

                setIndex(nextIndex);

                if (!timerRef.current) {
                    setScrollTop(nextIndex * lineHeight);
                }
            }

            messageBus.subscribe("audioTimeUpdate", handler);

            return function () {
                messageBus.unSubscribe("audioTimeUpdate", handler);
            };
        },
        [lyrics, lineHeight]
    );

    React.useEffect(
        function () {
            const { key } = musicContext.currentSong;

            if (key == null) {
                return;
            }

            refreshData(downloadLyrics(key));
        },
        [musicContext.currentSong, refreshData]
    );

    function updateIndex(i) {
        setIndex(i);
        setScrollTop(i * lineHeight);

        messageBus.publish("updateSongTime", lyrics[i].time);
    }

    function handleScroll() {
        clearTimeout(timerRef.current);
        setScrollTop(null);

        timerRef.current = setTimeout(() => {
            timerRef.current = null;
        }, SCROLL_IGNORE_DURATION);
    }

    return (
        <Scrollable
            className={`relative flex w-full px-4 text-center text-white transition-all duration-1000 laptop:w-2/4 laptop:grow-0 laptop:pl-0 desktop:w-3/5 ${!showSonglist && "laptop:w-3/4 desktop:w-4/5"}`}
            showScroller={false}
            scrollTop={scrollTop}
            onScroll={handleScroll}
            smooth={true}>
            <ToggleSonglist onClick={toggleShowSonglist} className="absolute bottom-0 left-1 top-0 my-auto hidden laptop:flex" />

            <div style={{ height: height - (lineHeight || 0) / 2 }} />
            <div ref={getHeight}>
                {lyrics.map(({ words }, i) => (
                    <p
                        key={i}
                        className={`mb-6 overflow-hidden whitespace-pre py-[2px] transition-all duration-300 ${index === i ? "text-2xl font-medium text-white" : "text-gray-500"}`}
                        onClick={() => updateIndex(i)}>
                        {" " + words + " "}
                    </p>
                ))}
            </div>
            <div style={{ height }} />
        </Scrollable>
    );
}
