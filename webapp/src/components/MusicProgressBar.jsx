import React from "react";
import { getEventXPos, getEvents } from "../utils/eventUtils";

const commonStyles = "absolute mt-auto mb-auto top-0 bottom-0";

export default function createMusicProgressBar() {
    let _sliderPos, _setSliderPos;

    return function MusicProgressBar({ songDurationSecs, currentTime = 0, onFastForward }) {
        const [sliderPos, setSliderPos] = React.useState(null);
        const sliderRef = React.useRef(null);
        const typeRef = React.useRef("");

        _sliderPos = sliderPos;
        _setSliderPos = setSliderPos;

        function onSeekStart(e, type) {
            const sliderRect = sliderRef.current.getBoundingClientRect();
            _setSliderPos(((getEventXPos(e) - sliderRect.left) / sliderRect.width) * songDurationSecs);
            const { move, end, cancel } = getEvents(type);
            typeRef.current = type;

            document.body.addEventListener(move, onSeekMove);
            document.body.addEventListener(end, onSeekEnd);
            document.body.addEventListener(cancel, onSeekEnd);
        }

        function onSeekMove(e) {
            const sliderRect = sliderRef.current.getBoundingClientRect();
            const xPos = getEventXPos(e);

            if (xPos < sliderRect.left) {
                _setSliderPos(0);
            } else if (xPos > sliderRect.right) {
                _setSliderPos(songDurationSecs);
            } else {
                _setSliderPos(((xPos - sliderRect.left) / sliderRect.width) * songDurationSecs);
            }
        }

        function onSeekEnd() {
            onFastForward(_sliderPos);
            _setSliderPos(null);
            const { move, end, cancel } = getEvents(typeRef.current);

            document.body.removeEventListener(move, onSeekMove);
            document.body.removeEventListener(end, onSeekEnd);
            document.body.removeEventListener(cancel, onSeekEnd);
        }

        return (
            <div className="relative block h-3 w-full" ref={sliderRef} onMouseDown={e => onSeekStart(e, "mouse")} onTouchStart={e => onSeekStart(e, "touch")}>
                <div className={`${commonStyles} left-0 h-1 w-full bg-gray-400`} />
                <div className={`${commonStyles} left-0 h-1 bg-[#cea127]`} style={{ width: `${((sliderPos != null ? sliderPos : currentTime) / songDurationSecs) * 100}%` }}>
                    <i className={`${commonStyles} ${sliderPos != null ? "w-3 rounded-[50%]" : ""} right-0 h-3 w-1 translate-x-1/2 bg-inherit duration-200 hover:w-3 hover:rounded-[50%]`} />
                </div>
            </div>
        );
    };
}
