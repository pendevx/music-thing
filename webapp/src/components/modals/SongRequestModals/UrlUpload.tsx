import React from "react";
import { RaisedInputPlaceholder } from "../..";
import { UploaderProps, UploadSongDtoBase } from "./types";
import useSongUpload from "./useSongUpload";

export type UrlUploadDto = {
    url: string;
} & UploadSongDtoBase;

type ValidityType = { [key in keyof UrlUploadDto]: boolean };

export default function UrlUpload({ reportValidity, onParameterChange }: UploaderProps) {
    const [currentSource, setCurrentSource] = React.useState<string>("Please select");
    const [validity, setValidity] = React.useState<ValidityType>({} as ValidityType);
    const { parameters, updateValue } = useSongUpload({
        title: "",
        url: "",
        source: "",
    });

    const options = React.useMemo(
        () => [
            {
                value: "YouTube",
                prefix: "https://www.youtube.com/watch?v=",
            },
            {
                value: "YouTube Music",
                prefix: "https://music.youtube.com/watch?v=",
            },
            {
                value: "Soundcloud",
                prefix: "https://soundcloud.com/",
            },
        ],
        []
    );

    const onSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const corresponding = options.find(o => o.value === e.target.value);

        setCurrentSource(corresponding ? e.target.value : "");
        updateValue("source", e.target.value.replace(/ /, ""));
        reportValidity(2, !!corresponding && !!e.target.value);

        setValidity(prev => ({
            ...prev,
            source: !!corresponding && !!e.target.value,
        }));
    };

    const onChange = (id: number, isValid: boolean, key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        reportValidity(id, isValid);
        updateValue(key as keyof UrlUploadDto, value);

        setValidity(prev => ({
            ...prev,
            [key]: isValid,
        }));
    };

    const source = options.find(o => o.value === currentSource);
    onParameterChange(parameters);

    return (
        <div className="flex flex-col gap-4">
            <RaisedInputPlaceholder
                className={`block w-full rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white p-2 ${validity?.title ? "" : "border-red-600"}`}
                colorClass="text-white bg-[#080808] h-fit bottom-0 top-0"
                index={0}
                placeholder="Title"
                required
                type="text"
                name="title"
                onchange={onChange}
            />

            <div className="grid grid-cols-2 gap-4">
                <RaisedInputPlaceholder
                    className={`block w-full rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white p-2 ${validity?.url ? "" : "border-red-600"}`}
                    colorClass="text-white bg-[#080808] h-fit bottom-0 top-0 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-none disabled:pointer-events-auto"
                    index={1}
                    placeholder="URL"
                    required
                    type="text"
                    name="url"
                    onchange={onChange}
                    before={<span className="text-gray-400 [line-height:normal]">{source?.prefix}</span>}
                    forceRaise={!!source?.prefix}
                    disabled={!source}
                    title="Please select a source first"
                />

                <label className="rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white pr-2">
                    <select name="source" className="block w-full p-2 text-white" onChange={onSourceChange}>
                        <option className="text-black">Please select</option>
                        {options.map(option => (
                            <option key={option.value} className="text-black" value={option.value}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
}
