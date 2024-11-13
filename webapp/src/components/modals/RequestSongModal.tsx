import React from "react";
import ModalTemplate from "./ModalTemplate";
import { KeyedForm, RaisedInputPlaceholder } from "..";

type CommonInputType = { type: string; placeholder?: string };

type InputType = React.InputHTMLAttributes<HTMLInputElement> & CommonInputType & { type: "text" | "url" };
type SelectType = React.SelectHTMLAttributes<HTMLSelectElement> & CommonInputType & { options: string[]; type: "select" };
type FileType = React.InputHTMLAttributes<HTMLInputElement> & CommonInputType & { type: "file" };

const isSelect = (field: any): field is SelectType => field.type === "select";
const isInput = (field: any): field is InputType => field.type !== "select" && field.type !== "file";
const isFile = (field: any): field is FileType => field.type === "file";

type FormFieldType = SelectType | InputType | FileType;

export default function RequestSongModal() {
    const baseFields: FormFieldType[] = [
        { placeholder: "Title", type: "text", required: true, name: "title" },
        // { placeholder: "Artist", type: "text", required: true, name: "artist" },
        // { placeholder: "Album", type: "text", required: false, name: "album" },
    ];
    const [uploadMethod, setUploadMethod] = React.useState<"file" | "url">("url");
    const uploadFields = React.useMemo<FormFieldType[]>(() => {
        switch (uploadMethod) {
            case "file":
                return [{ type: "file", required: true, name: "file" }];
            case "url":
                return [
                    { placeholder: "URL", type: "url", required: true, name: "url" },
                    { type: "select", required: true, name: "source", options: ["YouTube", "YouTube Music", "Soundcloud"] },
                ];
            default:
                return [];
        }
    }, [uploadMethod]);
    const [formValid, setFormValid] = React.useState(false);
    const [valid, setValid] = React.useState<boolean[]>(Array(baseFields.length + uploadFields.length).fill(false));
    const switchUploadMethod = () => setUploadMethod(uploadMethod === "file" ? "url" : "file");

    const submitSongRequest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const title = formData.get("title") as string;
        const artist = formData.get("artist") as string;
        const album = formData.get("album") as string;
        const url = formData.get("url") as string;

        console.log({ title, artist, album, url });
    };

    const reportValidity = (id: number, v: boolean) => {
        const newValid = [...valid];
        newValid[id] = v;
        setValid(newValid);

        setFormValid(newValid.every(x => x));
    };

    const fields = [...baseFields, ...uploadFields];

    return (
        <ModalTemplate>
            <h3 className="mb-4 text-xl font-semibold">Request to upload a song</h3>

            <KeyedForm onSubmit={submitSongRequest} onKeyDown={e => e.stopPropagation()}>
                <div className="flex flex-col gap-2">
                    {fields.map((field, i) => {
                        if (isSelect(field)) {
                            return <Select field={field} i={i} key={field.name} />;
                        }

                        if (isFile(field)) {
                            return <File field={field} i={i} key={field.name} />;
                        }

                        if (isInput(field)) {
                            return <Input field={{ ...field, reportValidity }} i={i} key={field.name} />;
                        }
                    })}
                </div>

                <div className="mt-4 grid w-full grid-cols-2 gap-4">
                    <button
                        type="reset"
                        onClick={switchUploadMethod}
                        className="w-full cursor-pointer rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white bg-[#333] p-2 text-center text-white">
                        Switch to {uploadMethod === "file" ? "URL" : "File"} Upload
                    </button>
                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white bg-[#004317] p-2 text-center text-white disabled:cursor-not-allowed disabled:bg-[#355c42] [&:hover:not(:disabled)]:bg-[#117b38]"
                        disabled={!formValid}>
                        Submit Request
                    </button>
                </div>
            </KeyedForm>
        </ModalTemplate>
    );
}

type SelectProps = {
    field: SelectType;
    i: number;
};
function Select({ field, i }: SelectProps) {
    return (
        <select {...field} className="block w-full rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white p-2 text-white">
            {field.options.map(option => (
                <option key={i} value={option} className="text-black">
                    {option}
                </option>
            ))}
        </select>
    );
}

type FileProps = {
    field: FileType;
    i: number;
};
function File({ field, i }: FileProps) {
    return (
        <input
            type="file"
            name={field.name}
            required={field.required}
            key={i}
            onChange={e => {
                const file = e.target.files?.[0];
                console.log(file);
            }}
        />
    );
}

type InputProps = {
    field: InputType & { reportValidity: (id: number, value: boolean) => void };
    i: number;
};
function Input({ field, i }: InputProps) {
    return (
        <RaisedInputPlaceholder
            key={i}
            className="block w-full rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white p-2"
            colorClass="text-white bg-[#080808] px-2"
            index={i}
            {...field}
        />
    );
}
