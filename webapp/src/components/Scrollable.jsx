import React from "react";

export default function createScrollable() {
    let mousedownY;
    let _setScrollbarTop;
    let _setScrolling;

    return function _Scrollable({ className, children }) {
        const [showCustomScrollbar, setShowCustomScrollbar] = React.useState(true);
        const [scrollbarHeight, setScrollbarHeight] = React.useState(0);
        const [scrollbarTop, setScrollbarTop] = React.useState(0);
        const [scrolling, setScrolling] = React.useState(false);
        const containerRef = React.useRef(null);
        const contentRef = React.useRef(null);

        _setScrollbarTop = setScrollbarTop;
        _setScrolling = setScrolling;

        React.useEffect(function () {
            if (containerRef.current.scrollHeight >= containerRef.current.clientHeight && getComputedStyle(containerRef.current, "::-webkit-scrollbar").display === "none") {
                setShowCustomScrollbar(true);
                updateScrollbarHeight();
            } else {
                setShowCustomScrollbar(false);
            }

            window.addEventListener("resize", updateScrollbarHeight);

            return function () {
                window.removeEventListener("resize", updateScrollbarHeight);
            }
        }, []);

        function updateScrollbarHeight() {
            setScrollbarHeight(containerRef.current.clientHeight * containerRef.current.clientHeight / contentRef.current.scrollHeight);
        }

        function onScroll() {
            const totalDistance = containerRef.current.clientHeight - scrollbarHeight;
            const currentDistancePercentage = containerRef.current.scrollTop / (contentRef.current.scrollHeight - containerRef.current.clientHeight);
            setScrollbarTop(totalDistance * currentDistancePercentage);
        }

        function onMouseDown(e) {
            mousedownY = e.clientY - containerRef.current.getBoundingClientRect().top - scrollbarTop;
            setScrolling(true);

            document.body.addEventListener("mousemove", onMouseMove);
            document.body.addEventListener("mouseup", onMouseUp);
            document.body.addEventListener("mouseleave", onMouseUp);
        }

        function onMouseMove(e) {
            const bottomHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
            const totalDistance = containerRef.current.clientHeight - scrollbarHeight;
            let nextScrollbarTop, nextScrollTop;

            if (containerRef.current.scrollTop <= 0 && e.movementY <= 0) {
                nextScrollbarTop = 0;
                nextScrollTop = 0;
            } else if (containerRef.current.scrollTop >= bottomHeight && e.movementY >= 0) {
                nextScrollbarTop = totalDistance;
                nextScrollTop = bottomHeight;
            } else {
                const distanceFromOrigin = e.clientY - containerRef.current.getBoundingClientRect().top - mousedownY;
                const currentDistancePercentage = distanceFromOrigin / totalDistance;
                nextScrollbarTop = distanceFromOrigin;
                nextScrollTop = currentDistancePercentage * (contentRef.current.scrollHeight - containerRef.current.clientHeight);
            }

            console.log(nextScrollbarTop)
            _setScrollbarTop(nextScrollbarTop);
            containerRef.current.scrollTop = nextScrollTop;
        }

        function onMouseUp() {
            _setScrolling(false);

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
                        <i className={`bg-[#666] hover:bg-[#aaa] transition-colors duration-100 w-full block rounded-xl absolute z-10 ${scrolling ? "bg-[#aaa]" : ""}`}
                            style={{ height: scrollbarHeight, top: scrollbarTop }}
                            onMouseDown={onMouseDown} />
                    </span>
                }
            </div>
        )
    }
}
