class LocalStorageRepository {
    #cache = new Map();

    get(key) {
        const value = localStorage.getItem(key);
        this.#cache.set(key, value);
        return value;
    }

    set(key, value) {
        if (!this.#cache.has(key) || this.#cache.get(key) !== value) {
            this.#cache.set(key, value);
            localStorage.setItem(key, value);
        }
    }
}

export const keys = {
    PLAY_BEHAVIOUR: "playBehaviour",
    SEED: "seed",
    CURRENT_SONG_ID: "lastSongId",
};

export default new LocalStorageRepository();
