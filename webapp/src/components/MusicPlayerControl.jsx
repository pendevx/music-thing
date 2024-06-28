import React from "react";
import { MusicContext } from "../contexts/MusicContext";
import { MusicPausedSvg } from "../icons";

export default function MusicPlayerControl() {
    const [time, setTime] = React.useState("00:00");
    const [totalDuration, setTotalDuration] = React.useState("00:00");
    const [audioTime, setAudioTime] = React.useState(0);
    const [songDurationSecs, setSongDurationSecs] = React.useState(0);
    const audioRef = React.useRef(null);
    const musicContext = React.useContext(MusicContext);

    function timeUpdateHandler() {
        setTime(`${Math.floor(audioRef?.current.currentTime / 60).toString().padStart(2, "0")}:${Math.floor(audioRef?.current.currentTime % 60).toString().padStart(2, "0")}`);

        setAudioTime(audioRef?.current.currentTime);
    }

    function fastforwardHandler(e) {
        audioRef.current.currentTime = e.target.value;
    }

    function onPlayBtnClick() {
        if (musicContext.currentSong.key === null) {
            musicContext.chooseSong(0);
            musicContext.setIsPlaying(true);
        } else {
            audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause();
            musicContext.setIsPlaying(!audioRef.current.paused);
        }
    }

    function musicEndHandler() {
        musicContext.nextSong();
    }

    React.useEffect(function () {
        (async function() {
            if (!musicContext.currentSong.key) return;

            const songUrl = `https://music-worker.pendevx.workers.dev/${musicContext.currentSong.key}`;
            audioRef.current.pause();
            audioRef.current.src = songUrl;

            try {
                audioRef.current.load();
                await audioRef.current.play();
                
                if (isNaN(audioRef.current.duration)) {
                    setTime("--:--");
                } else {
                    const formatTimer = val => Math.floor(val).toString().padStart(2, "0");

                    setTotalDuration(`${formatTimer(audioRef?.current.duration / 60)}:${formatTimer(audioRef?.current.duration % 60)}`);

                    setSongDurationSecs(audioRef?.current.duration);
                    musicContext.setIsPlaying(true);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }, [musicContext.currentSong]);

    return (
        <div className="bg-black">
            <audio ref={audioRef} onTimeUpdate={timeUpdateHandler} onEnded={musicEndHandler} />

            <div className="bg-white rounded-[2em] pl-4 pr-4">
                <div className="w-full h-16 flex overflow-hidden items-center gap-2">
                    <div className="hover:bg-gray-200 h-[60%] aspect-square flex justify-center items-center rounded-[50%] cursor-pointer transition-color duration-300" onClick={onPlayBtnClick}>
                        { musicContext.isPlaying ? 
                            <MusicPausedSvg /> : 
                            <div className="border-l-black border-solid w-0 border-transparent border-[0.7em] translate-x-[30%]" /> }
                    </div>

                    <div className="grow">
                        <input type="range" className="w-full block" min="0" max={songDurationSecs} value={audioTime} onChange={fastforwardHandler} />
                    </div>

                    <div>
                        {time} / {totalDuration}
                    </div>
                </div>
            </div>
        </div>
    )
}
