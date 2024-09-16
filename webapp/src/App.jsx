import { MusicPlayerControl, FrequencyGraph, MusicList, Lyrics, FullScreenOverlay } from "./components";
import React from "react";
import { MusicContext } from "./contexts/MusicContext";
import { ToggleSonglist } from "./icons";

export default function App() {
    const [showSonglist, setShowSonglist] = React.useState(true);
    const [bodyHeight, setBodyHeight] = React.useState(0);
    const [fullScreen, setFullScreen] = React.useState(false);
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

                if (musicContext.currentSongId == null) {
                    musicContext.next();
                } else {
                    musicContext.isPlaying ? musicContext.pause() : musicContext.play();
                }
                break;
            }

            case "Escape": {
                setFullScreen(false);
                break;
            }

            case "f": {
                setFullScreen(!fullScreen);
                break;
            }

            case "s": {
                setShowSonglist(!showSonglist);
                break;
            }
        }
    }

    function onSongSelected() {
        const isBelowLaptop = window.matchMedia("(max-width: 768px)").matches;

        if (isBelowLaptop) {
            setShowSonglist(false);
        }
    }

    const toggleShowSonglist = () => setShowSonglist(!showSonglist);

    return (
        <div onKeyDown={onKeyDown} tabIndex={0} className="font-sans">
            <h1 className="hidden">pendevx music</h1>
            <div className="fixed inset-0 flex h-full flex-col justify-between">
                <div className="mt-4 h-full overflow-hidden">
                    <div ref={bodyRef} className="r-0 relative flex h-full max-h-full w-full justify-end laptop:right-[33.33333%] laptop:w-[133.33333%] desktop:right-[25%] desktop:w-[125%]">
                        <MusicList showSonglist={showSonglist} onSongSelected={onSongSelected} />
                        <Lyrics height={bodyHeight / 2} showSonglist={showSonglist} toggleShowSonglist={toggleShowSonglist} />

                        <ToggleSonglist onClick={toggleShowSonglist} className={`fixed z-20 my-auto laptop:hidden ${showSonglist ? "right-8 top-8" : "right-6 top-6"}`} />
                    </div>
                </div>

                <div>
                    <FrequencyGraph audioRef={audioRef} />
                    <MusicPlayerControl ref={audioRef} goFullscreen={() => setFullScreen(true)} />
                </div>
            </div>

            <div className={`fixed inset-0 z-10 bg-zinc-900 transition-all duration-1000 ${!fullScreen && "translate-y-full"}`}>
                <FullScreenOverlay hideFullscreen={() => setFullScreen(false)} />
            </div>
        </div>
    );
}
