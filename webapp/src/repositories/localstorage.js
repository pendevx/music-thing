class LocalStorageRepository {
    get(key) {
        try {
            return localStorage.getItem(key);
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
    PLAY_BEHAVIOUR: "playBehaviour"
}

export default new LocalStorageRepository();
