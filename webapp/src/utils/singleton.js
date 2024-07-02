export default function singleton(type) {
    let instance = null;

    const proxy = new Proxy(type.constructor, {
        construct(_, args) {
            if (instance == null) {
                instance = new type(...args);
            }

            return instance;
        }
    });

    type.constructor = proxy;

    return proxy;
}
