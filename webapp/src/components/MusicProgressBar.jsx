import React from "react";

const commonStyles = "absolute mt-auto mb-auto top-0 bottom-0";

export default function MusicProgressBar({ songDurationSecs, currentTime = 0, onFastForward }) {
    const [sliderPos, setSliderPos] = React.useState(null);
    const sliderRef = React.useRef(null);

    function onMouseDown() {
        setSliderPos(currentTime);

        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp);
        document.body.addEventListener("mouseleave", onMouseUp);
    }

    function onMouseMove(e) {
        console.log(sliderPos);
        const sliderRect = sliderRef.current.getBoundingClientRect();

        if (e.clientX < sliderRect.left) {
            setSliderPos(0);
        } else if (e.clientX > sliderRect.right) {
            setSliderPos(1);
        } else {
            setSliderPos((e.clientX - sliderRect.left) / sliderRect.width * songDurationSecs);
        }
    }

    function onMouseUp() {
        onFastForward(sliderPos);
        setSliderPos(null);

        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUp);
        document.body.removeEventListener("mouseleave", onMouseUp);
    }

    return (
        <div className="w-full block relative h-3" ref={sliderRef}>
            <div className={`${commonStyles} h-1 bg-gray-400 left-0 w-full`} />
            <div className={`${commonStyles} h-1 bg-black left-0`} style={{ width: `${(sliderPos != null ? sliderPos / songDurationSecs : currentTime / songDurationSecs) * 100}%` }}>
                <i className={`${commonStyles} ${sliderPos != null ? "w-3 rounded-[50%]" : ""} h-3 bg-black right-0 w-1 hover:w-3 hover:rounded-[50%] translate-x-1/2 duration-200`} onMouseDown={onMouseDown} />
            </div>
        </div>
    )
}
