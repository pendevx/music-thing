import React from "react";
import ModalTemplate from "./ModalTemplate";
import { KeyedForm } from "..";
import useValidateForm from "../../hooks/useValidateForm";
import { FileUpload, UrlUpload } from "./SongRequestModals";
import useFetch from "../../hooks/useFetch";

type UploadTypes = "file" | "url";

type UrlUploadDto = {
    title: string;
    url: string;
    source: string;
};

const lengths: {
    [key in UploadTypes]: number;
} = {
    file: 2,
    url: 3,
};

export default function RequestSongModal() {
    const [uploadMethod, setUploadMethod] = React.useState<UploadTypes>("url");
    const { formValid, reportValidity } = useValidateForm(lengths[uploadMethod], uploadMethod);
    const { refreshData: uploadByUrl } = useFetch();
    const { refreshData: uploadByFile } = useFetch();

    const map = {
        file: {
            uploadMethodForm: <FileUpload reportValidity={reportValidity} />,
            uploadMethodButton: "URL",
            uploadFn: (file: File) => {
                uploadByFile("/api/music/uploadByFile", {});
            },
        },
        url: {
            uploadMethodForm: <UrlUpload reportValidity={reportValidity} />,
            uploadMethodButton: "File",
            uploadFn: async (json: UrlUploadDto) => {
                uploadByUrl("/api/music/uploadByUrl", {
                    method: "POST",
                    body: JSON.stringify(json),
                });
            },
        },
    };

    const switchUploadMethod = () => setUploadMethod(uploadMethod === "file" ? "url" : "file");

    const submitSongRequest = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (uploadMethod === "url") {
            const form = e.currentTarget as HTMLFormElement;
            const formData = new FormData(form);

            const requestObject = Array.from(formData.entries()).reduce(
                (memo, [key, value]) => ({
                    ...memo,
                    [key]: value,
                }),
                {}
            ) as UrlUploadDto;

            map[uploadMethod].uploadFn(requestObject);
        } else {
            const file = (e.currentTarget as HTMLFormElement).file.files?.[0];
            if (file) {
                map[uploadMethod].uploadFn(file);
            }
        }
    };

    return (
        <ModalTemplate>
            <h3 className="mb-4 text-xl font-semibold">Request to upload a song</h3>

            <KeyedForm onSubmit={submitSongRequest} onKeyDown={e => e.stopPropagation()}>
                {map[uploadMethod].uploadMethodForm}

                <div className="mt-4 grid w-full grid-cols-2 gap-4">
                    <button
                        type="reset"
                        onClick={switchUploadMethod}
                        className="w-full cursor-pointer rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white bg-[#333] p-2 text-center text-white">
                        Switch to {map[uploadMethod].uploadMethodButton} Upload
                    </button>
                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white bg-[#004317] p-2 text-center text-white disabled:cursor-not-allowed disabled:bg-[#355c42] [&:hover:not(:disabled)]:bg-[#117b38]"
                        disabled={!formValid}>
                        Submit Song Request
                    </button>
                </div>
            </KeyedForm>
        </ModalTemplate>
    );
}
