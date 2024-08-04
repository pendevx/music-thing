import React from "react";
import { MusicContext } from "../contexts/MusicContext";
import { MusicProgressBar, Scrollable, TrackButtons } from "./";
import messageBus from "../utils/MessageBus";
import { formatTime } from "../utils/formats";
import { MusicIconSvg } from "../icons";

export default function FullScreenOverlay({ hideFullscreen }) {
    const [totalDuration, setTotalDuration] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);
    const imgRef = React.useRef(null);
    const musicContext = React.useContext(MusicContext);

    React.useEffect(function () {
        function updateTotalDuration(duration) {
            setTotalDuration(duration);
        }

        function timeUpdate(time) {
            setCurrentTime(time);
        }

        messageBus.subscribe("totalDurationUpdate", updateTotalDuration);
        messageBus.subscribe("audioTimeUpdate", timeUpdate);

        return function () {
            messageBus.unSubscribe("totalDurationUpdate", updateTotalDuration);
            messageBus.unSubscribe("audioTimeUpdate", timeUpdate);
        };
    }, []);

    function onFastForward(secs) {
        messageBus.publish("updateSongTime", secs);
    }

    function handlePlayPause() {
        if (musicContext.isPlaying) {
            musicContext.pause();
        } else {
            musicContext.play();
        }
    }

    return (
        <Scrollable showScroller={false} className="absolute inset-0 overflow-auto py-16 text-white">
            <div className="mx-auto flex w-2/3 flex-col items-center gap-4 laptop:w-1/2 desktop:w-1/4">
                <h2 className="text-3xl">{musicContext.songName()}</h2>

                <h3 className="mt-[-10px] text-xl">{"Artist" ?? musicContext.artist()}</h3>

                <div className="aspect-square w-full rounded-2xl bg-white p-24">
                    {/* <img src="asdf" alt="" ref={imgRef} />

                        {!imgRef.current?.complete && <MusicIconSvg />} */}

                    <MusicIconSvg />
                </div>

                <MusicProgressBar songDurationSecs={totalDuration} currentTime={currentTime} onFastForward={onFastForward} />

                <span className="textfont-semibold mt-[-10px]">
                    {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>

                <div className="mt-4 grid h-full w-full grid-cols-3 gap-28">
                    <div className="text-center">a</div>
                    <div className="text-center">b</div>
                    <div className="text-center">c</div>
                </div>

                <div className="w-full">
                    <TrackButtons handlePlayPause={handlePlayPause} isPlaying={musicContext.isPlaying} next={musicContext.next} previous={musicContext.previous} className="gap-28" />
                </div>
            </div>

            <button className="fixed bottom-1 left-1 w-fit cursor-pointer px-8 py-4 text-white transition-colors duration-100 hover:bg-zinc-800" onClick={hideFullscreen}>
                Back
            </button>
        </Scrollable>
    );
}
