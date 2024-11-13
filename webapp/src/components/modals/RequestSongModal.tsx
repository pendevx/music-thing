import React from "react";
import ModalTemplate from "./ModalTemplate";
import { KeyedForm } from "..";
import useValidateForm from "../../hooks/useValidateForm";
import { FileUpload, UrlUpload } from "./SongRequestModals";

type UploadTypes = "file" | "url";

const lengths: {
    [key in UploadTypes]: number;
} = {
    file: 2,
    url: 3,
};

export default function RequestSongModal() {
    const [uploadMethod, setUploadMethod] = React.useState<UploadTypes>("url");
    const { formValid, reportValidity } = useValidateForm(lengths[uploadMethod], uploadMethod);

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
