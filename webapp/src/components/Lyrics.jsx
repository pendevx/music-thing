import React from "react";
import messageBus from "../utils/MessageBus";
import { Scrollable } from "./";
import { ToggleSonglist } from "../icons/";
import { MusicContext } from "../contexts/MusicContext";
import { buildLyricsUrl } from "../utils/url-builder.api";

export default function Lyrics({ height, showSonglist, toggleShowSonglist }) {
    const [lyrics, setLyrics] = React.useState([]);
    const [index, setIndex] = React.useState(0);
    const [scrollTop, setScrollTop] = React.useState(0);
    const lineHeight = React.useRef(null);
    const lyricsListRef = React.useRef(null);
    const timerRef = React.useRef(null);
    const musicContext = React.useContext(MusicContext);

    React.useEffect(
        function () {
            lineHeight.current = lyricsListRef.current.scrollHeight / lyrics.length;

            function handler(msg) {
                const highlightedIndex = lyrics.findIndex(({ time }) => time > msg) - 1;
                const nextIndex = highlightedIndex === -2 ? lyrics.length - 1 : highlightedIndex;

                setIndex(nextIndex);

                if (!timerRef.current) {
                    setScrollTop(nextIndex * lineHeight.current);
                }
            }

            messageBus.subscribe("audioTimeUpdate", handler);

            return function () {
                messageBus.unSubscribe("audioTimeUpdate", handler);
            };
        },
        [lyrics]
    );

    React.useEffect(
        function () {
            const { key } = musicContext.currentSong;
            setLyrics([]);

            if (key == null) {
                return;
            }

            (async function () {
                try {
                    const path = buildLyricsUrl(key);
                    const res = await fetch(path);
                    if (!res.ok) {
                        throw new Error();
                    }

                    const lyrics = await res.json();
                    setLyrics(lyrics);
                } catch {
                    console.log("log: no lyrics were found");
                }
            })();
        },
        [musicContext.currentSong]
    );

    function updateIndex(i) {
        setIndex(i);
        setScrollTop(i * lineHeight.current);

        messageBus.publish("lyricsPressed", lyrics[i].time);
    }

    function handleScroll() {
        clearTimeout(timerRef.current);
        setScrollTop(null);

        timerRef.current = setTimeout(() => {
            timerRef.current = null;
        }, 1500);
    }

    return (
        <Scrollable
            className={`relative flex w-full px-4 text-center text-white transition-all duration-1000 laptop:w-2/4 laptop:grow-0 laptop:pl-0 desktop:w-3/5 ${!showSonglist && "laptop:w-3/4 desktop:w-4/5"}`}
            showScroller={false}
            scrollTop={scrollTop}
            onScroll={handleScroll}
            smooth={true}>
            <ToggleSonglist onClick={toggleShowSonglist} className="absolute bottom-0 left-1 top-0 my-auto hidden laptop:flex" />

            <div style={{ height: height - (lineHeight.current / 2 || 0) }} />
            <div ref={lyricsListRef}>
                {lyrics.map(({ words }, i) => (
                    <p
                        key={i}
                        className={`mb-6 overflow-hidden whitespace-pre transition-all duration-300 ${index === i ? "text-2xl font-medium text-white" : "text-gray-500"}`}
                        onClick={() => updateIndex(i)}>
                        {" " + words + " "}
                    </p>
                ))}
            </div>
            <div style={{ height }} />
        </Scrollable>
    );
}
