import React from "react";
import localStorageRepository from "../repositories/LocalStorageRepository";

export function useStoreState(key) {
    const [data, setData] = React.useState(localStorageRepository.get(key));
    localStorageRepository.set(key, data);
    return [data, setData];
}

export function useStoreRef(key) {
    const ref = React.useRef(localStorageRepository.get(key));

    const proxy = new Proxy(ref, {
        set(obj, prop, value) {
            localStorageRepository.set(key, value);
            return Reflect.set(obj, prop, value);
        },
    });

    return proxy;
}
