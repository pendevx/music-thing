export function nextPlayBehaviour(currentPlayBehaviour) {
    let nextBehaviour = "";

    switch (currentPlayBehaviour) {
        case "loop":
            nextBehaviour = "shuffle";
            break;

        case "shuffle":
            nextBehaviour = null;
            break;

        default:
            nextBehaviour = "loop";
            break;
    }

    return nextBehaviour;
}

export function lastPlayBehaviour(currentPlayBehaviour) {
    let lastBehaviour = "";

    switch (currentPlayBehaviour) {
        case "loop":
            lastBehaviour = null;
            break;

        case "shuffle":
            lastBehaviour = "loop";
            break;

        default:
            lastBehaviour = "shuffle";
            break;
    }

    return lastBehaviour;
}
