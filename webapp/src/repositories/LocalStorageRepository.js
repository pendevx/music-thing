class LocalStorageRepository {
    get(key) {
        try {
            let value = localStorage.getItem(key);

            if (value === "null") value = null;

            return value;
        } catch (e) {
            console.error(e);
            throw new Error("Failed to get item from local storage");
        }
    }

    set(key, value) {
        localStorage.setItem(key, value);
    }
}

export const keys = {
    PLAY_BEHAVIOUR: "playBehaviour",
    SEED: "seed",
    LAST_SONG_INDEX: "lastSongIndex",
};

export default new LocalStorageRepository();
