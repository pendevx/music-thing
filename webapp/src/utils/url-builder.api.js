export function buildSongUrl(songKey) {
    return "//" + location.hostname + ":" + import.meta.env.VITE_API_PORT + "/music/download/" + encodeURIComponent(songKey);
}

export function buildListUrl() {
    return "//" + location.hostname + ":" + import.meta.env.VITE_API_PORT + "/music/list";
}

export function buildLyricsUrl(songKey) {
    return "//" + location.hostname + ":" + import.meta.env.VITE_API_PORT + "/lyrics/download/" + encodeURIComponent(songKey);
}
