import { MusicLoopSvg, MusicShuffleSvg } from "../icons";
import { CircularSvg } from "./";
import React from "react";
import { MusicContext } from "../contexts";
import { MusicPausedSvg } from "../icons";
import { MusicProgressBar } from "./";

const twoSpacePadding = val => Math.floor(val).toString().padStart(2, "0");
const formatTime = seconds => `${twoSpacePadding(Math.floor(seconds / 60))}:${twoSpacePadding(Math.floor(seconds % 60))}`;

function MusicPlayerControl({ onplay }, ref) {
    const [time, setTime] = React.useState("--:--");
    const [totalDuration, setTotalDuration] = React.useState("00:00");
    const [audioTime, setAudioTime] = React.useState(0);
    const [songDurationSecs, setSongDurationSecs] = React.useState(0);
    const musicContext = React.useContext(MusicContext);

    function onPlayBehaviourChange(behaviour) {
        musicContext.setPlayBehaviour(behaviour === musicContext.playBehaviour ? null : behaviour);
    }

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

            try {
                ref.current.load();
                await ref.current.play();

                if (isNaN(ref.current.duration)) {
                    setTime("--:--");
                } else {
                    setTotalDuration(formatTime(ref?.current.duration));
                    setSongDurationSecs(ref?.current.duration);

                    musicContext.play();
                }
            } catch (e) {
                console.error(e);
                musicContext.pause();
            }
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
            <audio ref={ref} onTimeUpdate={timeUpdateHandler} onEnded={musicEndHandler} onPlay={onplay} crossOrigin="anonymous" />

            <div className="w-full h-16 flex overflow-hidden items-center gap-2 text-white pl-4 pr-4 border-t-[1px] border-gray-900 border-solid bg-zinc-900">
                <p className="basis-60 border-r-[1px] border-slate-600 border-dotted h-full flex items-center">{musicContext.songName()}</p>

                <div className="hover:bg-gray-800 h-[60%] aspect-square flex justify-center items-center rounded-[50%] cursor-pointer transition-color duration-300" onClick={handlePlayPause}>
                    {musicContext.isPlaying ?
                        <MusicPausedSvg /> :
                        <div className="border-l-white border-solid w-0 border-transparent border-[0.7em] translate-x-[30%]" />}
                </div>

                <div className="grow">
                    <MusicProgressBar songDurationSecs={songDurationSecs} currentTime={audioTime} onFastForward={fastforwardHandler} />
                </div>

                {time} / {totalDuration}

                <div className="flex h-full items-center gap-1 ml-2">
                    <CircularSvg className="h-[60%]" selected={musicContext.playBehaviour === "shuffle"} onClick={() => onPlayBehaviourChange("shuffle")}>
                        <MusicShuffleSvg />
                    </CircularSvg>

                    <CircularSvg className="h-[60%]" selected={musicContext.playBehaviour === "loop"} onClick={() => onPlayBehaviourChange("loop")}>
                        <MusicLoopSvg />
                    </CircularSvg>
                </div>
            </div>
        </div>
    )
}

export const ForwardMusicPlayerControl = React.forwardRef(MusicPlayerControl);
