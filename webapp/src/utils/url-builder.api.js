export function buildSongUrl(songKey) {
    return `/api/music/download/${encodeURIComponent(songKey)}`;
}

export function buildSonglistUrl() {
    return `/api/music/list`;
}

export function buildLyricsUrl(songKey) {
    return `/api/lyrics/download/${encodeURIComponent(songKey)}`;
}
