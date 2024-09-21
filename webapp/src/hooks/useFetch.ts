import React from "react";

export default function useFetch<T>(fallbackValue: T) {
    const [data, setData] = React.useState<T>(fallbackValue);
    const [error, setError] = React.useState<Error | null>(null);
    const [isFetching, setIsFetching] = React.useState<boolean>(false);
    const aborter = React.useRef<AbortController | null>(null);
    const refreshData = React.useCallback(
        /**
         * Fetches data. Any incomplete requests at the time of a new request being sent will will be aborted.
         * @param {string} url The URL to request
         * @param {object} options Fetch API options object
         * @returns The data after being parsed into JSON
         */
        function (url: string, options: RequestInit = {}) {
            setError(null);

            aborter.current && aborter.current.abort();
            aborter.current = new AbortController();

            if (!url) {
                setData(fallbackValue);
                setError(new Error("A URL must be provided."));
                return;
            }

            setIsFetching(true);

            (async function () {
                try {
                    const response = await fetch(url, {
                        ...options,
                        signal: aborter.current?.signal,
                    });
                    const json = await response.json();
                    setData(json);
                } catch (err) {
                    setError(err as Error);
                    setData(fallbackValue);
                }

                setIsFetching(false);
            })();
        },
        []
    );

    return {
        data,
        error,
        isFetching,
        refreshData,
    };
}
