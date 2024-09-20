import React from "react";
import localStorageRepository from "../repositories/LocalStorageRepository";

/**
 *
 * @param key The key to read from the local storage
 * @param converter A runtime type converter
 * @returns A tuple containing the value and a setter function for the state
 */
export function useStoreState<T>(key: string, converter: (value: any) => T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [data, setData] = React.useState(converter(localStorageRepository.get(key)));
    localStorageRepository.set(key, data);
    return [data, setData];
}

export function useStoreRef<T>(key: string, converter: (value: any) => T): React.MutableRefObject<T> {
    const ref = React.useRef(converter(localStorageRepository.get(key)));

    const proxy = new Proxy(ref, {
        set(obj, prop, value) {
            localStorageRepository.set(key, value);
            return Reflect.set(obj, prop, value);
        },
    });

    return proxy;
}
