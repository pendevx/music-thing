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
        }
    }

    commit() {
        for (const [k,v] in this.#cache.entries()) {
            localStorage.setItem(k, v);
        }
    }
}

export const keys = {
    PLAY_BEHAVIOUR: "playBehaviour",
    SEED: "seed",
    CURRENT_SONG_ID: "lastSongId",
};

const repository = new LocalStorageRepository();

window.addEventListener("beforeunload", repository.commit);

export default repository;
