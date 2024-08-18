import React from "react";

export default function useFetch(fallbackValue) {
    const [data, setData] = React.useState(fallbackValue);
    const [error, setError] = React.useState(null);
    const [isFetching, setIsFetching] = React.useState(false);
    const aborter = React.useRef(null);
    const refreshData = React.useCallback(
        /**
         * Fetches data. Any incomplete requests at the time of a new request being sent will will be aborted.
         * @param {string} url The URL to request
         * @param {object} options Fetch API options object
         * @returns The data after being parsed into JSON
         */
        function (url, options = {}) {
            setError(null);

            aborter.current && aborter.current.abort();
            aborter.current = new AbortController();

            if (!url) {
                setData(fallbackValue);
                setError("A URL must be provided.");
                return;
            }

            setIsFetching(true);

            (async function () {
                try {
                    const response = await fetch(url, {
                        ...options,
                        signal: aborter.signal,
                    });
                    const json = await response.json();
                    setData(json);
                } catch (err) {
                    setError(err);
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
