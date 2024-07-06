import React from "react";

const commonStyles = "absolute mt-auto mb-auto top-0 bottom-0";

function getEventXPos(e) {
    return e.touches?.[0].clientX || e.clientX;
}

function getEvents(type) {
    return {
        touch: {
            move: "touchmove",
            end: "touchend",
            cancel: "touchcancel",
        },
        mouse: {
            move: "mousemove",
            end: "mouseup",
            cancel: "mouseleave",
        },
    }[type];
}

export default function createMusicProgressBar() {
    let _sliderPos, _setSliderPos;
    let slideType = "";

    return function MusicProgressBar({ songDurationSecs, currentTime = 0, onFastForward }) {
        const [sliderPos, setSliderPos] = React.useState(null);
        const sliderRef = React.useRef(null);

        _sliderPos = sliderPos;
        _setSliderPos = setSliderPos;

        function onMouseDown(e, type) {
            const sliderRect = sliderRef.current.getBoundingClientRect();

            _setSliderPos(((getEventXPos(e) - sliderRect.left) / sliderRect.width) * songDurationSecs);

            const { move, end, cancel } = getEvents(type);

            slideType = type;

            document.body.addEventListener(move, onMouseMove);
            document.body.addEventListener(end, onMouseUp);
            document.body.addEventListener(cancel, onMouseUp);
        }

        function onMouseMove(e) {
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

        function onMouseUp() {
            onFastForward(_sliderPos);
            _setSliderPos(null);

            const { move, end, cancel } = getEvents(slideType);

            document.body.removeEventListener(move, onMouseMove);
            document.body.removeEventListener(end, onMouseUp);
            document.body.removeEventListener(cancel, onMouseUp);
        }

        return (
            <div className="relative block h-3 w-full" ref={sliderRef} onMouseDown={e => onMouseDown(e, "mouse")} onTouchStart={e => onMouseDown(e, "touch")}>
                <div className={`${commonStyles} left-0 h-1 w-full bg-gray-400`} />
                <div className={`${commonStyles} left-0 h-1 bg-[#cea127]`} style={{ width: `${(sliderPos != null ? sliderPos / songDurationSecs : currentTime / songDurationSecs) * 100}%` }}>
                    <i className={`${commonStyles} ${sliderPos != null ? "w-3 rounded-[50%]" : ""} right-0 h-3 w-1 translate-x-1/2 bg-inherit duration-200 hover:w-3 hover:rounded-[50%]`} />
                </div>
            </div>
        );
    };
}
