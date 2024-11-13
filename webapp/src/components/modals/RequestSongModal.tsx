import React from "react";
import ModalTemplate from "./ModalTemplate";
import { KeyedForm, RaisedInputPlaceholder } from "..";

type CommonInputType = { type: string; placeholder?: string };

type InputType = React.InputHTMLAttributes<HTMLInputElement> & CommonInputType & { type: "text" | "url" };
type SelectType = React.SelectHTMLAttributes<HTMLSelectElement> & CommonInputType & { options: string[]; type: "select" };
type FileType = React.InputHTMLAttributes<HTMLInputElement> & CommonInputType & { type: "file" };

type FormFieldType = SelectType | InputType | FileType;

export default function RequestSongModal() {
    const baseFields: FormFieldType[] = [{ placeholder: "Title", type: "text", required: true, name: "title" }];
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

    return (
        <ModalTemplate>
            <h3 className="mb-4 text-xl font-semibold">Request to upload a song</h3>

            <KeyedForm onSubmit={submitSongRequest} onKeyDown={e => e.stopPropagation()}>
                {uploadMethod === "file" ? <FileUpload reportValidity={reportValidity} /> : <UrlUpload reportValidity={reportValidity} />}

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

type UploaderProps = {
    reportValidity: (id: number, value: boolean) => void;
};

function FileUpload({ reportValidity }: UploaderProps) {
    return (
        <div className="flex flex-col gap-2">
            <RaisedInputPlaceholder
                className="block w-full rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white p-2"
                colorClass="text-white bg-[#080808] px-2"
                index={0}
                placeholder="Title"
                required
                type="text"
                name="title"
                reportValidity={reportValidity}
            />

            <input type="file" name="file" required className="block w-full rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white p-2 text-white" />
        </div>
    );
}

function UrlUpload({ reportValidity }: UploaderProps) {
    return (
        <div className="flex flex-col gap-2">
            <RaisedInputPlaceholder
                className="block w-full rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white p-2"
                colorClass="text-white bg-[#080808] px-2"
                index={0}
                placeholder="Title"
                required
                type="text"
                name="title"
                reportValidity={reportValidity}
            />

            <RaisedInputPlaceholder
                className="block w-full rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white p-2"
                colorClass="text-white bg-[#080808] px-2"
                index={1}
                placeholder="URL"
                required
                type="url"
                name="url"
                reportValidity={reportValidity}
            />

            <select name="source" className="block w-full rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white p-2 text-white">
                <option className="text-black" value="YouTube">
                    YouTube
                </option>
                <option className="text-black" value="YouTube Music">
                    YouTube Music
                </option>
                <option className="text-black" value="Soundcloud">
                    Soundcloud
                </option>
            </select>
        </div>
    );
}
