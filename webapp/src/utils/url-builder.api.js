export function downloadSong(songKey) {
    return `/api/music/download/${encodeURIComponent(songKey)}`;
}

export function listSongs() {
    return `/api/music/list`;
}

export function downloadLyrics(songKey) {
    return `/api/lyrics/download/${encodeURIComponent(songKey)}`;
}
