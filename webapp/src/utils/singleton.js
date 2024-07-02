export default function singleton(type) {
    let instance = null;

    return new Proxy(type.constructor, {
        construct(_, args) {
            if (instance == null) {
                instance = new type(...args);
            }

            return instance;
        }
    });
}
