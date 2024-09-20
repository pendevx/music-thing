/* eslint-disable react-refresh/only-export-components */
import { LoopShuffleControl, MusicProgressBar, TrackButtons } from ".";
import React from "react";
import { MusicContext } from "../contexts/MusicContext";
import messageBus from "../utils/MessageBus";
import { downloadSong } from "../utils/url-builder.api";
import { formatTime } from "../utils/formats";

type MusicPlayerControlProps = {
    onplay?: () => void;
    goFullscreen: () => void;
    audioRef: React.RefObject<HTMLAudioElement>;
};

export default function MusicPlayerControl({ onplay, goFullscreen, audioRef }: MusicPlayerControlProps) {
    const [audioTime, setAudioTime] = React.useState(0);
    const [currentSongId, setCurrentSongId] = React.useState(0);
    const musicContext = React.useContext(MusicContext);

    React.useEffect(
        function () {
            function timeUpdated(time: number) {
                if (audioRef.current) {
                    audioRef.current.currentTime = time;
                }
            }

            messageBus.publish("totalDurationUpdate", audioRef.current?.duration);

            messageBus.subscribe("updateSongTime", timeUpdated);

            if (navigator.mediaSession) {
                navigator.mediaSession.setActionHandler("previoustrack", musicContext.previous);
                navigator.mediaSession.setActionHandler("nexttrack", musicContext.next);
                navigator.mediaSession.setActionHandler("play", musicContext.play);
                navigator.mediaSession.setActionHandler("pause", musicContext.pause);
            }

            return function () {
                messageBus.unSubscribe("updateSongTime", timeUpdated);
            };
        },
        [musicContext]
    );

    function timeUpdateHandler() {
        if (!audioRef.current) {
            return;
        }

        setAudioTime(audioRef.current.currentTime);
        messageBus.publish("audioTimeUpdate", audioRef.current.currentTime);
    }

    function fastforwardHandler(secs: number) {
        if (!audioRef.current) {
            return;
        }

        audioRef.current.currentTime = secs;
        setAudioTime(secs);
    }

    function handlePlayPause() {
        if (!audioRef.current) {
            return;
        }

        if (audioRef.current.paused) {
            musicContext.play();
        } else {
            musicContext.pause();
        }
    }

    if (audioRef.current && musicContext.currentSongId && currentSongId !== musicContext.currentSongId) {
        setCurrentSongId(musicContext.currentSongId);
        document.title = musicContext.currentSong.name || "pendevx music";

        const songUrl = downloadSong(musicContext.currentSongId);

        audioRef.current.pause();
        audioRef.current.src = songUrl;
        audioRef.current.load();
        audioRef.current.play().then(musicContext.play);
    }

    if (musicContext.isPlaying && audioRef.current?.paused) {
        audioRef.current?.play();
    } else if (!musicContext.isPlaying && !audioRef.current?.paused) {
        audioRef.current?.pause();
    }

    const time = audioRef.current?.duration ? formatTime(audioTime) : "--:--";
    const totalDuration = audioRef.current?.duration ? formatTime(audioRef.current.duration) : "--:--";
    const songDurationSecs = audioRef.current?.duration || 0;

    return (
        <div className="bg-black">
            <audio
                ref={audioRef}
                onTimeUpdate={timeUpdateHandler}
                onEnded={musicContext.next}
                onPlay={onplay}
                onLoadedMetadata={() => messageBus.publish("totalDurationUpdate", audioRef.current?.duration)}
                crossOrigin="anonymous"
                loop={musicContext.playBehaviour === "loop"}
            />

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

// possible error: Unhandled Promise Rejection: AbortError: The play() request was interrupted by a call to pause().
// https://developer.chrome.com/blog/play-request-was-interrupted

// we are able to swallow/ignore the error since:
// the any previous unfulfilled play requests should be exited anyways, and
// the pause current or load new song request should be ran.
// we only want the latest play request to be executed and fulfilled.