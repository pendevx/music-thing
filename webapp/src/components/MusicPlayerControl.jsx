/* eslint-disable react-refresh/only-export-components */
import { LoopShuffleControl, MusicProgressBar, TrackButtons } from "./";
import React from "react";
import { MusicContext } from "../contexts/MusicContext";
import messageBus from "../utils/MessageBus";
import { downloadSong } from "../utils/url-builder.api";
import { formatTime } from "../utils/formats";

function MusicPlayerControl({ onplay, goFullscreen }, ref) {
    const [audioTime, setAudioTime] = React.useState(0);
    const musicContext = React.useContext(MusicContext);

    React.useEffect(function () {
        function timeUpdated(time) {
            ref.current.currentTime = time;
        }

        messageBus.publish("totalDurationUpdate", ref.current.duration);

        messageBus.subscribe("updateSongTime", timeUpdated);

        if (navigator.mediaSession) {
            navigator.mediaSession.setActionHandler("previoustrack", () => musicContext.previous());
            navigator.mediaSession.setActionHandler("nexttrack", () => musicContext.next());
            navigator.mediaSession.setActionHandler("play", () => musicContext.play());
            navigator.mediaSession.setActionHandler("pause", () => musicContext.pause());
        }

        return function () {
            messageBus.unSubscribe("updateSongTime", timeUpdated);
        };
    }, []);

    function timeUpdateHandler() {
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

    React.useEffect(
        function () {
            document.title = musicContext.currentSong.name || "pendevx music";

            (async function () {
                if (!musicContext.currentSong.id) return;

                const songUrl = downloadSong(musicContext.currentSong.id);

                ref.current.pause();
                ref.current.src = songUrl;
                ref.current.load();

                await ref.current.play();
                musicContext.play();

                messageBus.publish("totalDurationUpdate", ref.current.duration);
            })();
        },
        [musicContext.currentSong]
    );

    if (musicContext.isPlaying && ref.current?.paused) {
        ref.current?.play();
    } else if (!musicContext.isPlaying && !ref.current?.paused) {
        ref.current?.pause();
    }

    const time = ref.current?.duration ? formatTime(audioTime) : "--:--";
    const totalDuration = ref.current?.duration ? formatTime(ref.current.duration) : "--:--";
    const songDurationSecs = ref.current?.duration || 0;

    return (
        <div className="bg-black">
            <audio ref={ref} onTimeUpdate={timeUpdateHandler} onEnded={() => musicContext.next()} onPlay={onplay} crossOrigin="anonymous" loop={musicContext.playBehaviour === "loop"} />

            <div className="flex h-16 w-full items-center gap-2 overflow-hidden border-t-[1px] border-solid border-gray-900 bg-zinc-900 pl-4 pr-4 text-white">
                <p
                    className="flex h-full basis-32 items-center overflow-hidden overflow-ellipsis text-nowrap border-r-[1px] border-dotted border-slate-600 hover:cursor-pointer desktop:basis-60"
                    onClick={goFullscreen}>
                    {musicContext.currentSong.name}
                </p>
                <div className="h-8">
                    <TrackButtons handlePlayPause={handlePlayPause} isPlaying={musicContext.isPlaying} next={musicContext.next} previous={musicContext.previous} className="ml-1 mr-2" />
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

// possible error: Unhandled Promise Rejection: AbortError: The play() request was interrupted by a call to pause().
// https://developer.chrome.com/blog/play-request-was-interrupted

// we are able to swallow/ignore the error since:
// the any previous unfulfilled play requests should be exited anyways, and
// the pause current or load new song request should be ran.
// we only want the latest play request to be executed and fulfilled.
