export function downloadSong(songId: number) {
    return `/api/music/download/${encodeURIComponent(songId)}`;
}

export function listSongs() {
    return `/api/music/list`;
}

export function downloadLyrics(songId: number) {
    return `/api/lyrics/download/${encodeURIComponent(songId)}`;
}
