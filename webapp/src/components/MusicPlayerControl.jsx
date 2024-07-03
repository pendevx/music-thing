import { LoopShuffleControl } from "./";
import React from "react";
import { MusicContext } from "../contexts";
import { MusicPausedSvg } from "../icons";
import { createMusicProgressBar } from "./";

const twoSpacePadding = val => Math.floor(val).toString().padStart(2, "0");
const formatTime = seconds => `${twoSpacePadding(Math.floor(seconds / 60))}:${twoSpacePadding(Math.floor(seconds % 60))}`;

const MusicProgressBar = createMusicProgressBar();

function _MusicPlayerControl({ onplay }, ref) {
    const [time, setTime] = React.useState("--:--");
    const [totalDuration, setTotalDuration] = React.useState("00:00");
    const [audioTime, setAudioTime] = React.useState(0);
    const [songDurationSecs, setSongDurationSecs] = React.useState(0);
    const musicContext = React.useContext(MusicContext);

    function timeUpdateHandler() {
        setTime(formatTime(ref?.current.currentTime));
        setAudioTime(ref?.current.currentTime);
    }

    function fastforwardHandler(secs) {
        ref.current.currentTime = secs;
        setAudioTime(secs);
    }

    function handlePlayPause() {
        if (ref.current.paused) {
            musicContext.play();
        } else {
            musicContext.pause();
        }
    }

    function musicEndHandler() {
        musicContext.next();
    }

    React.useEffect(function () {
        (async function () {
            if (!musicContext.currentSong.key) return;

            const songUrl = import.meta.env.VITE_FILE_URL + musicContext.currentSong.key;

            ref.current.pause();
            ref.current.src = songUrl;
        
            ref.current.load();
            await ref.current.play();

            if (isNaN(ref.current.duration)) {
                setTime("--:--");
            } else {
                setTotalDuration(formatTime(ref?.current.duration));
                setSongDurationSecs(ref?.current.duration);

                musicContext.play();
            }

            // possible error: Unhandled Promise Rejection: AbortError: The play() request was interrupted by a call to pause().
            // https://developer.chrome.com/blog/play-request-was-interrupted

            // we are able to swallow the error as:
            // the any previous unfulfilled play requests should be exited anyways, and
            // the pause current or load new song request should be ran.
            // we only want the latest play request to be executed and fulfilled.
        })();
    }, [musicContext.currentSong]);

    React.useEffect(function () {

        if (musicContext.isPlaying) {
            ref?.current.play();
        } else {
            ref?.current.pause();
        }

    }, [musicContext.isPlaying])

    return (
        <div className="bg-black">
            <audio ref={ref} onTimeUpdate={timeUpdateHandler} onEnded={musicEndHandler} onPlay={onplay} crossOrigin="anonymous" loop={musicContext.playBehaviour === "loop"} />

            <div className="w-full h-16 flex overflow-hidden items-center gap-2 text-white pl-4 pr-4 border-t-[1px] border-gray-900 border-solid bg-zinc-900">
                <p className="basis-40 desktop:basis-60 overflow-hidden border-r-[1px] border-slate-600 border-dotted h-full flex items-center">{musicContext.songName()}</p>

                <div className="hover:bg-gray-800 h-[60%] aspect-square flex justify-center items-center rounded-[50%] cursor-pointer transition-color duration-300" onClick={handlePlayPause}>
                    {musicContext.isPlaying ?
                        <MusicPausedSvg /> :
                        <div className="border-l-white border-solid w-0 border-transparent border-[0.7em] translate-x-[30%]" />}
                </div>

                <div className="grow">
                    <MusicProgressBar songDurationSecs={songDurationSecs} currentTime={audioTime} onFastForward={fastforwardHandler} />
                </div>

                {time} / {totalDuration}

                <LoopShuffleControl />
            </div>
        </div>
    )
}

export const MusicPlayerControl = React.forwardRef(_MusicPlayerControl);
