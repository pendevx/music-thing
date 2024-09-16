import React from "react";
import localStorageRepository from "../repositories/LocalStorageRepository";

export function useStoreState(key, converter) {
    const [data, setData] = React.useState(converter(localStorageRepository.get(key)));
    localStorageRepository.set(key, data);
    return [data, setData];
}

export function useStoreRef(key, converter) {
    const ref = React.useRef(converter(localStorageRepository.get(key)));

    const proxy = new Proxy(ref, {
        set(obj, prop, value) {
            localStorageRepository.set(key, value);
            return Reflect.set(obj, prop, value);
        },
    });

    return proxy;
}
