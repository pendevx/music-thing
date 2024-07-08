import React from "react";
import messageBus from "../utils/MessageBus";
import Scrollable from "./Scrollable";
import { ToggleSonglist } from "../icons/";
import { MusicContext } from "../contexts/MusicContext";

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
                if (timerRef.current != null) {
                    return;
                }

                const highlightedIndex = lyrics.findIndex(({ time }) => time > msg) - 1;
                if (highlightedIndex === -2) {
                    setIndex(lyrics.length - 1);
                    setScrollTop(lyrics.length * lineHeight.current);
                } else {
                    setIndex(highlightedIndex);
                    setScrollTop(highlightedIndex * lineHeight.current);
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
            if (musicContext.currentSong.key == null) {
                return;
            }

            setLyrics([]);

            (async function () {
                const { key } = musicContext.currentSong;
                if (key.endsWith(".mp3")) {
                    const lyricsUrl = key.replace(".mp3", ".lrc");
                    try {
                        const data = await fetch(import.meta.env.VITE_FILE_URL + lyricsUrl);
                        if (!data.ok) {
                            throw new Error();
                        }

                        const text = await data.text();

                        const lyrics = text.split("\n").map(x => {
                            const regex = /\[(\d{2}):(\d{2})\.(\d{2})?\](.*)/gi;
                            const match = regex.exec(x);

                            return {
                                time: +match[1] * 60 + +match[2] + +match[3] / 1000,
                                words: match[4],
                            };
                        });

                        setLyrics(lyrics);
                    } catch {
                        console.log("log: no lyrics were found");
                    }
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
            console.log("continue");
            timerRef.current = null;
        }, 1500);
    }

    return (
        <Scrollable
            className={`relative flex w-full px-4 text-center text-white transition-all duration-1000 laptop:w-2/4 laptop:grow-0 laptop:pl-0 desktop:w-3/5 ${!showSonglist && "laptop:w-3/4 desktop:w-4/5"}`}
            showScroller={false}
            scrollTop={scrollTop}
            onScroll={handleScroll}>
            <ToggleSonglist onClick={toggleShowSonglist} className="absolute bottom-0 left-1 top-0 my-auto hidden laptop:flex" />
            <div style={{ height }} />
            <div ref={lyricsListRef}>
                {lyrics.map(({ words }, i) => (
                    <p key={i} className={`mb-6 overflow-hidden transition-all duration-300 ${index === i ? "mt-4 text-2xl font-medium text-white" : "text-gray-500"}`} onClick={() => updateIndex(i)}>
                        {words}
                    </p>
                ))}
            </div>
            <div style={{ height }} />
        </Scrollable>
    );
}
