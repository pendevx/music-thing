import { MusicPlayerControl, FrequencyGraph, MusicList, Lyrics } from "./components";
import React from "react";
import { MusicContext } from "./contexts/MusicContext";
import { SongList } from "./icons";

export default function App() {
    const [showSonglist, setShowSonglist] = React.useState(true);
    const [bodyHeight, setBodyHeight] = React.useState(0);
    const audioRef = React.useRef(null);
    const bodyRef = React.useRef(null);
    const musicContext = React.useContext(MusicContext);

    React.useEffect(function () {
        const resizeHandler = () => setBodyHeight(bodyRef.current.clientHeight);
        resizeHandler();

        window.addEventListener("resize", resizeHandler);

        return function () {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    function onKeyDown(e) {
        switch (e.key) {
            case " ": {
                e.preventDefault();

                if (musicContext.currentSong.key == null) {
                    musicContext.next();
                } else {
                    musicContext.isPlaying ? musicContext.pause() : musicContext.play();
                }
                break;
            }
        }
    }

    return (
        <div className="fixed inset-0 flex h-full flex-col justify-between font-sans" onKeyDown={onKeyDown} tabIndex={0}>
            <div className="mt-4 overflow-hidden">
                <div ref={bodyRef} className="r-0 relative flex max-h-full w-full justify-end laptop:right-[33.33333%] laptop:w-[133.33333%] desktop:right-[25%] desktop:w-[125%]">
                    <MusicList />
                    <Lyrics height={bodyHeight / 2} showSonglist={showSonglist} toggleShowSonglist={() => setShowSonglist(!showSonglist)} />

                    <div
                        className={`fixed z-20 my-auto flex h-12 w-12 items-center justify-center bg-[#0f0f0f] transition-all duration-1000 laptop:hidden ${showSonglist ? "right-8 top-8" : "right-6 top-6"}`}
                        onClick={() => setShowSonglist(!showSonglist)}>
                        <SongList />
                    </div>
                </div>
            </div>

            <div>
                <FrequencyGraph audioRef={audioRef} />
                <MusicPlayerControl ref={audioRef} />
            </div>
        </div>
    );
}
