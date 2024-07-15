/* eslint-disable react-refresh/only-export-components */
import { LoopShuffleControl, MusicProgressBar } from "./";
import React from "react";
import { MusicContext } from "../contexts/MusicContext";
import { MusicPausedSvg, ChangeTrack } from "../icons";
import messageBus from "../utils/MessageBus";

const twoSpacePadding = val => Math.floor(val).toString().padStart(2, "0");
const formatTime = seconds => twoSpacePadding(seconds / 60) + ":" + twoSpacePadding(seconds % 60);

function MusicPlayerControl({ onplay }, ref) {
    const [time, setTime] = React.useState("--:--");
    const [totalDuration, setTotalDuration] = React.useState("00:00");
    const [audioTime, setAudioTime] = React.useState(0);
    const [songDurationSecs, setSongDurationSecs] = React.useState(0);
    const musicContext = React.useContext(MusicContext);

    function timeUpdateHandler() {
        setTime(formatTime(ref?.current.currentTime));
        setAudioTime(ref?.current.currentTime);

        messageBus.publish("audioTimeUpdate", ref?.current.currentTime);
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

    React.useEffect(function () {
        messageBus.subscribe("lyricsPressed", function (time) {
            ref.current.currentTime = time;
            setAudioTime(time);
        });

        const prevTrack = () => musicContext.previous();
        const nextTrack = () => musicContext.next();
        const play = () => musicContext.play();
        const pause = () => musicContext.pause();

        if (navigator.mediaSession) {
            navigator.mediaSession.setActionHandler("previoustrack", prevTrack);
            navigator.mediaSession.setActionHandler("nexttrack", nextTrack);
            navigator.mediaSession.setActionHandler("play", play);
            navigator.mediaSession.setActionHandler("pause", pause);
        }

        return function () {
            messageBus.unSubscribe("lyricsPressed");

            if (navigator.mediaSession) {
                navigator.mediaSession.setActionHandler("previoustrack", null);
                navigator.mediaSession.setActionHandler("nexttrack", null);
                navigator.mediaSession.setActionHandler("play", null);
                navigator.mediaSession.setActionHandler("pause", null);
            }
        };
    }, []);

    React.useEffect(
        function () {
            (async function () {
                if (!musicContext.currentSong.key) return;

                const songUrl = import.meta.env.VITE_MUSIC_URL + encodeURIComponent(musicContext.currentSong.key);

                ref.current.pause();
                ref.current.src = songUrl;

                ref.current.load();

                await ref.current.play();
                setTotalDuration(formatTime(ref?.current.duration));
                setSongDurationSecs(ref?.current.duration);

                if (isNaN(ref.current.duration)) {
                    setTime("--:--");
                } else {
                    musicContext.play();
                }

                // possible error: Unhandled Promise Rejection: AbortError: The play() request was interrupted by a call to pause().
                // https://developer.chrome.com/blog/play-request-was-interrupted

                // we are able to swallow the error as:
                // the any previous unfulfilled play requests should be exited anyways, and
                // the pause current or load new song request should be ran.
                // we only want the latest play request to be executed and fulfilled.
            })();
        },
        [musicContext.currentSong]
    );

    React.useEffect(
        function () {
            if (musicContext.isPlaying) {
                ref?.current.play().then(() => {
                    setTotalDuration(formatTime(ref?.current.duration));
                    setSongDurationSecs(ref?.current.duration);
                });
            } else {
                ref?.current.pause();
            }
        },
        [musicContext.isPlaying]
    );

    return (
        <div className="bg-black">
            <audio ref={ref} onTimeUpdate={timeUpdateHandler} onEnded={() => musicContext.next()} onPlay={onplay} crossOrigin="anonymous" loop={musicContext.playBehaviour === "loop"} />

            <div className="flex h-16 w-full items-center gap-2 overflow-hidden border-t-[1px] border-solid border-gray-900 bg-zinc-900 pl-4 pr-4 text-white">
                <p className="flex h-full basis-32 items-center overflow-hidden overflow-ellipsis text-nowrap border-r-[1px] border-dotted border-slate-600 desktop:basis-60">
                    {musicContext.songName()}
                </p>
                <div className="ml-1 mr-2 grid grid-cols-3 gap-2">
                    <ChangeTrack className="rotate-180" onClick={() => musicContext.previous()} />
                    <div className="transition-color flex w-8 cursor-pointer items-center justify-center rounded-[50%] duration-300 hover:bg-gray-800" onClick={handlePlayPause}>
                        {musicContext.isPlaying ? <MusicPausedSvg /> : <div className="w-0 translate-x-[30%] border-[0.7em] border-solid border-transparent border-l-white" />}
                    </div>
                    <ChangeTrack onClick={() => musicContext.next()} />
                </div>
                <div className="hidden grow tablet:block">
                    <MusicProgressBar songDurationSecs={songDurationSecs} currentTime={audioTime} onFastForward={fastforwardHandler} />
                </div>
                {time} / {totalDuration}
                <LoopShuffleControl />
            </div>
        </div>
    );
}

export default React.forwardRef(MusicPlayerControl);
