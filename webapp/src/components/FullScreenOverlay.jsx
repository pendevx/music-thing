import React from "react";
import { MusicContext } from "../contexts/MusicContext";
import { MusicProgressBar, Scrollable } from "./";
import messageBus from "../utils/MessageBus";
import { formatTime } from "../utils/formats";
import { MusicIconSvg, PlayBehaviourIcon, MusicPausedSvg, MusicPlaySvg, ChangeTrack } from "../icons";

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

    function nextPlayBehaviour() {
        let nextBehaviour = "";

        switch (musicContext.playBehaviour) {
            case "loop":
                nextBehaviour = "shuffle";
                break;

            case "shuffle":
                nextBehaviour = null;
                break;

            default:
                nextBehaviour = "loop";
                break;
        }

        musicContext.setPlayBehaviour(nextBehaviour);
    }

    return (
        <Scrollable showScroller={false} className="absolute inset-0 overflow-auto py-16 text-white">
            <div className="midmobile:w-[70%] lgmobile:w-[60%] lglaptop:w-[35%] xllaptop:w-[30%] mx-auto flex w-4/5 flex-col items-center gap-4 tablet:w-[50%] laptop:w-[40%] desktop:w-1/4">
                <h2 className="text-center text-3xl">{musicContext.songName()}</h2>

                <h3 className="mt-[-10px] text-center text-xl">{"Artist" ?? musicContext.artist()}</h3>

                <div className="aspect-square w-full rounded-2xl bg-white p-10 tablet:p-16 laptop:p-20 desktop:p-24">
                    {/* <img src="asdf" alt="" ref={imgRef} />

                        {!imgRef.current?.complete && <MusicIconSvg />} */}

                    <MusicIconSvg />
                </div>

                <MusicProgressBar songDurationSecs={totalDuration} currentTime={currentTime} onFastForward={onFastForward} />

                <span className="textfont-semibold mt-[-10px]">
                    {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>

                <div className="w-full px-2">
                    <div className="midmobile:gap-x-20 grid grid-cols-3 grid-rows-2 gap-x-16 gap-y-5 desktop:gap-x-28">
                        <div className="flex h-full cursor-pointer items-center justify-center rounded-[50%] transition-colors duration-300 hover:bg-gray-800">?</div>
                        <div className="flex h-full cursor-pointer items-center justify-center rounded-[50%] transition-colors duration-300 hover:bg-gray-800">?</div>
                        <div className="flex h-full cursor-pointer items-center justify-center rounded-[50%] transition-colors duration-300 hover:bg-gray-800" onClick={nextPlayBehaviour}>
                            <PlayBehaviourIcon playBehaviour={musicContext.playBehaviour} className="lgmobile:p-1 h-full w-full fill-white tablet:p-2" />
                        </div>
                        <div
                            className="flex h-full cursor-pointer items-center justify-center rounded-[50%] transition-colors duration-300 hover:bg-gray-800 tablet:p-2"
                            onClick={() => musicContext.previous()}>
                            <ChangeTrack className="rotate-180" />
                        </div>
                        <div className="flex h-full cursor-pointer items-center justify-center rounded-[50%] transition-colors duration-300 hover:bg-gray-800 tablet:p-2" onClick={handlePlayPause}>
                            {musicContext.isPlaying ? <MusicPausedSvg /> : <MusicPlaySvg />}
                        </div>
                        <div
                            className="flex h-full cursor-pointer items-center justify-center rounded-[50%] transition-colors duration-300 hover:bg-gray-800 tablet:p-2"
                            onClick={() => musicContext.next()}>
                            <ChangeTrack />
                        </div>
                    </div>
                </div>
            </div>

            <button className="fixed bottom-1 left-1 w-fit cursor-pointer px-8 py-4 text-white transition-colors duration-100 hover:bg-zinc-800" onClick={hideFullscreen}>
                Back
            </button>
        </Scrollable>
    );
}
