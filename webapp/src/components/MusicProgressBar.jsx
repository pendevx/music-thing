import React from "react";

const commonStyles = "absolute mt-auto mb-auto top-0 bottom-0";

export default function createMusicProgressBar() {
    let _sliderPos, _setSliderPos;

    return function MusicProgressBar({ songDurationSecs, currentTime = 0, onFastForward }) {
        const [sliderPos, setSliderPos] = React.useState(null);
        const sliderRef = React.useRef(null);

        _sliderPos = sliderPos;
        _setSliderPos = setSliderPos;

        function onMouseDown(e) {
            const sliderRect = sliderRef.current.getBoundingClientRect();

            _setSliderPos((e.clientX - sliderRect.left) / sliderRect.width * songDurationSecs);

            document.body.addEventListener("mousemove", onMouseMove);
            document.body.addEventListener("mouseup", onMouseUp);
            document.body.addEventListener("mouseleave", onMouseUp);
        }

        function onMouseMove(e) {
            const sliderRect = sliderRef.current.getBoundingClientRect();

            if (e.clientX < sliderRect.left) {
                _setSliderPos(0);
            } else if (e.clientX > sliderRect.right) {
                _setSliderPos(songDurationSecs);
            } else {
                _setSliderPos((e.clientX - sliderRect.left) / sliderRect.width * songDurationSecs);
            }
        }

        function onMouseUp() {
            onFastForward(_sliderPos);
            _setSliderPos(null);

            document.body.removeEventListener("mousemove", onMouseMove);
            document.body.removeEventListener("mouseup", onMouseUp);
            document.body.removeEventListener("mouseleave", onMouseUp);
        }

        return (
            <div className="w-full block relative h-3" ref={sliderRef} onMouseDown={onMouseDown}>
                <div className={`${commonStyles} h-1 bg-gray-400 left-0 w-full`} />
                <div className={`${commonStyles} h-1 bg-[#cea127] left-0`}
                    style={{ width: `${(sliderPos != null ? sliderPos / songDurationSecs : currentTime / songDurationSecs) * 100}%` }}>
                    <i className={`${commonStyles} ${sliderPos != null ? "w-3 rounded-[50%]" : ""} h-3 bg-inherit right-0 w-1 hover:w-3 hover:rounded-[50%] translate-x-1/2 duration-200`} />
                </div>
            </div>
        )
    }
}
