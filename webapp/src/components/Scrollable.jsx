import React from "react";

export default function createScrollable() {
    let mousedownY = 0;

    return function Scrollable({ className, children }) {
        const [showCustomScrollbar, setShowCustomScrollbar] = React.useState(true);
        const [scrollbarHeight, setScrollbarHeight] = React.useState(0);
        const [scrolling, setScrolling] = React.useState(false);
        const [scrollPercentage, setScrollPercentage] = React.useState(0);
        const containerRef = React.useRef(null);
        const contentRef = React.useRef(null);

        React.useEffect(function () {
            function updateScrollbarHeight() {
                setScrollbarHeight(containerRef.current.clientHeight * containerRef.current.clientHeight / contentRef.current.scrollHeight);
            }
            
            if (containerRef.current.scrollHeight >= containerRef.current.clientHeight && getComputedStyle(containerRef.current, "::-webkit-scrollbar").display === "none") {
                setShowCustomScrollbar(true);
                updateScrollbarHeight();
            } else {
                setShowCustomScrollbar(false);
                return;
            }

            window.addEventListener("resize", updateScrollbarHeight);

            return function () {
                window.removeEventListener("resize", updateScrollbarHeight);
            }
        }, []);

        function scrollbarTop() {
            return (scrollPercentage * (containerRef.current?.clientHeight - scrollbarHeight)) || 0;
        }

        function onScroll() {
            const currentDistancePercentage = containerRef.current.scrollTop / (contentRef.current.scrollHeight - containerRef.current.clientHeight);
            setScrollPercentage(currentDistancePercentage);
        }

        function onMouseDown(e) {
            mousedownY = e.clientY - containerRef.current.getBoundingClientRect().top - scrollbarTop();
            setScrolling(true);

            document.body.addEventListener("mousemove", onMouseMove);
            document.body.addEventListener("mouseup", onMouseUp);
            document.body.addEventListener("mouseleave", onMouseUp);
        }

        function onMouseMove(e) {
            const bottomHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
            const totalDistance = containerRef.current.clientHeight - scrollbarHeight;
            let nextScrollPercentage;
            let nextScrollTop;

            if (containerRef.current.scrollTop <= 0 && e.movementY <= 0) {
                nextScrollPercentage = 0;
                nextScrollTop = 0;
            } else if (containerRef.current.scrollTop >= bottomHeight && e.movementY >= 0) {
                nextScrollPercentage = 1;
                nextScrollTop = bottomHeight;
            } else {
                const distanceFromOrigin = e.clientY - containerRef.current.getBoundingClientRect().top - mousedownY;
                const currentDistancePercentage = distanceFromOrigin / totalDistance;
                nextScrollPercentage = currentDistancePercentage;
                nextScrollTop = currentDistancePercentage * (contentRef.current.scrollHeight - containerRef.current.clientHeight);
            }
            
            if (nextScrollTop < 0) {
                nextScrollTop = 0;
            } else if (nextScrollTop > bottomHeight) {
                nextScrollTop = bottomHeight;
            }

            setScrollPercentage(nextScrollPercentage);
            containerRef.current.scrollTop = nextScrollTop;
        }

        function onMouseUp() {
            setScrolling(false);

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
                            style={{ 
                                height: scrollbarHeight || 0, 
                                top: scrollbarTop()
                            }}
                            onMouseDown={onMouseDown} />
                    </span>
                }
            </div>
        )
    }
}
