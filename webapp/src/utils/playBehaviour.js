export const playBehaviours = ["loop", "shuffle", null];

export function nextPlayBehaviour(currentPlayBehaviour) {
    let nextBehaviour = playBehaviours[(playBehaviours.indexOf(currentPlayBehaviour) + 1) % playBehaviours.length];
    return nextBehaviour;
}

export function lastPlayBehaviour(currentPlayBehaviour) {
    let lastBehaviour = playBehaviours[(playBehaviours.indexOf(currentPlayBehaviour) - 1) % playBehaviours.length];
    return lastBehaviour;
}
