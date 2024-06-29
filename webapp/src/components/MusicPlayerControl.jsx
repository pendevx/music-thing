import React from "react";
import { MusicContext } from "../contexts/MusicContext";
import { MusicPausedSvg } from "../icons";
import { MusicProgressBar } from "./";

const formatTimer = val => Math.floor(val).toString().padStart(2, "0");

export default function MusicPlayerControl() {
    const [time, setTime] = React.useState("00:00");
    const [totalDuration, setTotalDuration] = React.useState("00:00");
    const [audioTime, setAudioTime] = React.useState(0);
    const [songDurationSecs, setSongDurationSecs] = React.useState(0);
    const audioRef = React.useRef(null);
    const musicContext = React.useContext(MusicContext);

    function timeUpdateHandler() {
        setTime(formatTimer(audioRef?.current.currentTime / 60) + ":" + formatTimer(audioRef?.current.currentTime % 60));
        setAudioTime(audioRef?.current.currentTime);
    }

    function fastforwardHandler(secs) {
        audioRef.current.currentTime = secs;
    }

    function handlePlayPause() {
        if (audioRef.current.paused) {
            musicContext.play();
        } else {
            musicContext.pause();
        }
    }

    function musicEndHandler() {
        musicContext.next();
    }

    React.useEffect(function () {
        (async function() {
            if (!musicContext.currentSong.key) return;

            const songUrl = import.meta.env.VITE_FILE_URL + musicContext.currentSong.key;
            audioRef.current.pause();
            audioRef.current.src = songUrl;

            try {
                audioRef.current.load();
                await audioRef.current.play();
                
                if (isNaN(audioRef.current.duration)) {
                    setTime("--:--");
                } else {
                    setTotalDuration(`${formatTimer(audioRef?.current.duration / 60)}:${formatTimer(audioRef?.current.duration % 60)}`);
                    setSongDurationSecs(audioRef?.current.duration);

                    musicContext.play();
                }
            } catch (e) {
                console.error(e);
                musicContext.pause();
            }
        })();
    }, [musicContext.currentSong]);

    React.useEffect(function() {
        if (musicContext.isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [musicContext.isPlaying])

    return (
        <div className="bg-black">
            <audio ref={audioRef} onTimeUpdate={timeUpdateHandler} onEnded={musicEndHandler} />

            <div className="bg-white rounded-[2em] pl-4 pr-4">
                <div className="w-full h-16 flex overflow-hidden items-center gap-2">
                    <div className="hover:bg-gray-200 h-[60%] aspect-square flex justify-center items-center rounded-[50%] cursor-pointer transition-color duration-300" onClick={handlePlayPause}>
                        { musicContext.isPlaying ? 
                            <MusicPausedSvg /> : 
                            <div className="border-l-black border-solid w-0 border-transparent border-[0.7em] translate-x-[30%]" /> }
                    </div>

                    <div className="grow">
                        <MusicProgressBar songDurationSecs={songDurationSecs} currentTime={audioTime} onFastForward={fastforwardHandler} />
                    </div>

                    <div>
                        {time} / {totalDuration}
                    </div>
                </div>
            </div>
        </div>
    )
}
