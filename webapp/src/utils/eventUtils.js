export function getEventXPos(e) {
    return e.touches?.[0].clientX || e.clientX;
}

export function getEventYPos(e) {
    return e.touches ? e.touches[0].clientY : e.clientY;
}

export function getEvents(type) {
    const map = {
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
    };

    if (!(type in map)) throw new Error("Invalid event type");

    return map[type];
}
