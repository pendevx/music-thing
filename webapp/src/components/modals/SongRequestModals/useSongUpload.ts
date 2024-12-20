import React from "react";
import { UploadSongDtoBase } from "./types";

export default function useSongUpload<T extends UploadSongDtoBase>(initial: T) {
    const [parameters, setParameters] = React.useState<UploadSongDtoBase>(initial);

    const updateValue = <K extends string & keyof T>(key: K, value: T[K]) => {
        setParameters(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    return { parameters, updateValue };
}
