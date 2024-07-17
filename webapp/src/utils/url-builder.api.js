const baseUrl = `//${location.hostname}:${import.meta.env.VITE_API_PORT}/`;

export function buildSongUrl(songKey) {
    return `${baseUrl}music/download/${encodeURIComponent(songKey)}`;
}

export function buildListUrl() {
    return `${baseUrl}music/list`;
}

export function buildLyricsUrl(songKey) {
    return `${baseUrl}lyrics/download/${encodeURIComponent(songKey)}`;
}
