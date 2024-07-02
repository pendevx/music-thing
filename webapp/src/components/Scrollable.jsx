import React from "react";

// let _setScrollbarTop;

export default function Scrollable({ className, children }) {
    const [showCustomScrollbar, setShowCustomScrollbar] = React.useState(true);
    const [scrollbarHeight, setScrollbarHeight] = React.useState(0);
    const [scrollbarTop, setScrollbarTop] = React.useState(0);
    const [mousedownY, setMousedownY] = React.useState(0);
    const containerRef = React.useRef(null);
    const contentRef = React.useRef(null);

    // _setScrollbarTop = setScrollbarTop;

    React.useEffect(function () {
        if (containerRef.current.scrollHeight >= containerRef.current.clientHeight && getComputedStyle(containerRef.current, "::-webkit-scrollbar").display === "none") {
            setShowCustomScrollbar(true);
            setScrollbarHeight(containerRef.current.scrollHeight / contentRef.current.clientHeight * 100); 
        } else {
            setShowCustomScrollbar(false);
        }
    }, []);

    function onScroll() {
        const totalDistance = containerRef.current.clientHeight - scrollbarHeight;
        const currentDistancePercentage = containerRef.current.scrollTop / (contentRef.current.scrollHeight - containerRef.current.clientHeight);
        setScrollbarTop(totalDistance * currentDistancePercentage);
    }

    function onMouseDown(e) {
        setMousedownY(e.clientY - containerRef.current.getBoundingClientRect().top - scrollbarTop);

        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp);
        document.body.addEventListener("mouseleave", onMouseUp);
    }

    function onMouseMove(e) {
        // first get the scrollbartop value correct, then set the container.scrollTop

        const distanceFromOrigin = e.clientY - containerRef.current.getBoundingClientRect().top - mousedownY;
        const totalDistance = containerRef.current.clientHeight - scrollbarHeight;
        const currentDistancePercentage = distanceFromOrigin / totalDistance;
        containerRef.current.scrollTop = currentDistancePercentage * (contentRef.current.scrollHeight - containerRef.current.clientHeight);
        setScrollbarTop(distanceFromOrigin);
    }

    function onMouseUp() {
        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUp);
        document.body.removeEventListener("mouseleave", onMouseUp);
    }

    return (
        <div className={`${className} relative flex gap-2`}>
            <div ref={containerRef} className="grow overflow-auto" onScroll={onScroll}>
                <div ref={contentRef}>
                    {children}
                </div>
            </div>

            {showCustomScrollbar &&
                <span className="relative h-full min-w-2">
                    <i className="absolute inset-0 ml-auto mr-auto bg-[#333] w-[1px]" />
                    <i className="bg-[#666] hover:bg-[#aaa] transition-colors duration-100 w-full block rounded-xl absolute z-10" 
                        style={{ height: scrollbarHeight, top: scrollbarTop }}
                        onMouseDown={onMouseDown} />
                </span>
            }
        </div>
    )
}
