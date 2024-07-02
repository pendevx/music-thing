import React from "react";

export default function Scrollable({ className, children }) {
    const [showCustomScrollbar, setShowCustomScrollbar] = React.useState(true);
    const [scrollbarHeight, setScrollbarHeight] = React.useState(0);
    const [scrollbarTop, setScrollbarTop] = React.useState(0);
    const containerRef = React.useRef(null);
    const contentRef = React.useRef(null);

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
        const currentDistancePercentage = containerRef.current.scrollTop / (contentRef.current.scrollHeight - containerRef.current.clientHeight) * 100;
        setScrollbarTop(totalDistance * currentDistancePercentage / 100);
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
                    <i className="bg-[#666] w-full block rounded-xl absolute z-10" style={{ height: scrollbarHeight, top: scrollbarTop }} />
                </span>
            }
        </div>
    )
}
