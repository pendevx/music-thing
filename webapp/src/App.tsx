import { MusicPlayerControl, FrequencyGraph, MusicList, Lyrics, FullScreenOverlay, BlurredModal, SettingsButton } from "./components";
import React from "react";
import { MusicContext } from "./contexts/MusicContext";
import { ToggleSonglist } from "./icons";
import getViewportResolution, { ViewportResolution } from "./utils/viewportResolution";

const modalReducer = (state: Modal, action: { type: Modal; forceTo?: "set" | "reset" }): Modal =>
    action.forceTo === "set" ? action.type : action.forceTo === "reset" ? Modal.None : action.type === state ? Modal.None : action.type;

enum Modal {
    None,
    Fullscreen,
    Settings,
}

export default function App() {
    const [showSonglist, setShowSonglist] = React.useState<boolean>(true);
    const [bodyHeight, setBodyHeight] = React.useState<number>(0);
    const [activeModal, dispatchModal] = React.useReducer(modalReducer, Modal.None);
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const bodyRef = React.useRef<HTMLDivElement | null>(null);
    const musicContext = React.useContext(MusicContext);

    React.useEffect(function () {
        const resizeHandler = () => {
            if (bodyRef.current) {
                setBodyHeight(bodyRef.current.clientHeight);
            }
        };

        resizeHandler();

        window.addEventListener("resize", resizeHandler);

        return function () {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    function onKeyDown(e: React.KeyboardEvent) {
        switch (e.key.toLowerCase()) {
            case " ": {
                e.preventDefault();

                if (musicContext.currentSongId == null) {
                    musicContext.next();
                } else {
                    musicContext.isPlaying ? musicContext.pause() : musicContext.play();
                }
                break;
            }

            case "escape": {
                dispatchModal({ type: Modal.None });
                break;
            }

            case "f": {
                dispatchModal({ type: Modal.Fullscreen });
                break;
            }

            case "d": {
                setShowSonglist(!showSonglist);
                break;
            }
        }
    }

    function onSongSelected() {
        const resolution = getViewportResolution();

        if (resolution < ViewportResolution.Laptop) {
            dispatchModal({ type: Modal.Fullscreen });
        }
    }

    return (
        <div onKeyDown={onKeyDown} tabIndex={0} className="font-sans">
            <h1 className="hidden">pendevx music</h1>
            <div className="fixed inset-0 flex">
                <div className="flex h-full w-full flex-col justify-between">
                    <div className="mt-4 h-full overflow-hidden">
                        <div ref={bodyRef} className="r-0 relative flex h-full max-h-full w-full justify-end laptop:right-[33.33333%] laptop:w-[133.33333%] desktop:right-[25%] desktop:w-[125%]">
                            <MusicList showSonglist={showSonglist} onSongSelected={onSongSelected} />
                            <Lyrics height={bodyHeight / 2} showSonglist={showSonglist} />

                            <div className="fixed right-6 top-6 z-20 flex w-12 flex-col gap-2 p-1 laptop:w-14">
                                <ToggleSonglist onClick={() => setShowSonglist(!showSonglist)} />
                                <SettingsButton onClick={() => dispatchModal({ type: Modal.Settings })} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <FrequencyGraph audioRef={audioRef} />
                        <MusicPlayerControl audioRef={audioRef} goFullscreen={() => dispatchModal({ type: Modal.Fullscreen, forceTo: "set" })} />
                    </div>
                </div>
            </div>

            <BlurredModal show={activeModal != Modal.None}>
                <div className={`fixed inset-0 z-20 transition-all duration-1000 ${activeModal === Modal.None && "translate-y-full"}`}>
                    <FullScreenOverlay hideFullscreen={() => dispatchModal({ type: Modal.Fullscreen, forceTo: "reset" })} />
                </div>
            </BlurredModal>
        </div>
    );
}
