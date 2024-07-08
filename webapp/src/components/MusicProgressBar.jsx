import React from "react";
import { getEventXPos, getEvents } from "../utils/eventUtils";

const commonStyles = "absolute mt-auto mb-auto top-0 bottom-0";

export default function MusicProgressBar({ songDurationSecs, currentTime = 0, onFastForward }) {
    const [seek, setSeek] = React.useState({ isSeeking: null, pos: null });
    const sliderRef = React.useRef(null);
    const typeRef = React.useRef("");

    if (seek.isSeeking === false) {
        onFastForward(seek.pos);

        setSeek({
            isSeeking: null,
            pos: null,
        });
    }

    function onSeekStart(e, type) {
        const { move, end, cancel } = getEvents(type);
        typeRef.current = type;
        const sliderRect = sliderRef.current.getBoundingClientRect();

        document.body.addEventListener(move, onSeekMove);
        document.body.addEventListener(end, onSeekEnd);
        document.body.addEventListener(cancel, onSeekEnd);

        setSeek({
            isSeeking: true,
            pos: ((getEventXPos(e) - sliderRect.left) / sliderRect.width) * songDurationSecs,
        });

        function onSeekMove(e) {
            const xPos = getEventXPos(e);

            let pos;

            if (xPos < sliderRect.left) {
                pos = 0;
            } else if (xPos > sliderRect.right) {
                pos = songDurationSecs;
            } else {
                pos = ((xPos - sliderRect.left) / sliderRect.width) * songDurationSecs;
            }

            setSeek(old => ({
                ...old,
                pos,
            }));
        }

        function onSeekEnd() {
            document.body.removeEventListener(move, onSeekMove);
            document.body.removeEventListener(end, onSeekEnd);
            document.body.removeEventListener(cancel, onSeekEnd);

            setSeek(old => ({
                ...old,
                isSeeking: false,
            }));
        }
    }

    return (
        <div className="relative block h-3 w-full" ref={sliderRef} onMouseDown={e => onSeekStart(e, "mouse")} onTouchStart={e => onSeekStart(e, "touch")}>
            <div className={`${commonStyles} left-0 h-1 w-full bg-gray-400`} />
            <div className={`${commonStyles} left-0 h-1 bg-[#cea127]`} style={{ width: `${((seek.pos != null ? seek.pos : currentTime) / songDurationSecs) * 100}%` }}>
                <i className={`${commonStyles} ${seek.pos != null ? "w-3 rounded-[50%]" : ""} right-0 h-3 w-1 translate-x-1/2 bg-inherit duration-200 hover:w-3 hover:rounded-[50%]`} />
            </div>
        </div>
    );
}
