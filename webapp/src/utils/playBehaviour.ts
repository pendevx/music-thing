export const playBehaviours = ["loop", "shuffle", null];

export function nextPlayBehaviour(currentPlayBehaviour: string) {
    let nextBehaviour = playBehaviours[(playBehaviours.indexOf(currentPlayBehaviour) + 1) % playBehaviours.length];
    return nextBehaviour;
}

export function lastPlayBehaviour(currentPlayBehaviour: string) {
    let lastBehaviour = playBehaviours[(playBehaviours.indexOf(currentPlayBehaviour) - 1) % playBehaviours.length];
    return lastBehaviour;
}
