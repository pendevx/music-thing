import React from "react";
import ModalTemplate from "./ModalTemplate";
import { KeyedForm } from "..";
import useValidateForm from "../../hooks/useValidateForm";
import { FileUpload, UrlUpload } from "./SongRequestModals";
import useFetch from "../../hooks/useFetch";
import { UrlUploadDto } from "./SongRequestModals/UrlUpload";
import { UploadSongDtoBase } from "./SongRequestModals/types";

type UploadTypes = "file" | "url";

const lengths: {
    [key in UploadTypes]: number;
} = {
    file: 2,
    url: 3,
};

export default function RequestSongModal() {
    const [uploadMethod, setUploadMethod] = React.useState<UploadTypes>("url");
    const [uploadParameters, setUploadParameters] = React.useState<UploadSongDtoBase>({} as UploadSongDtoBase);
    const { formValid, reportValidity } = useValidateForm(lengths[uploadMethod], uploadMethod);
    const { refreshData: uploadByUrl } = useFetch(null, "/api/music/uploadByUrl");
    const { refreshData: uploadByFile } = useFetch(null, "/api/music/uploadByFile");

    const map = {
        file: {
            uploadMethodForm: <FileUpload reportValidity={reportValidity} onParameterChange={setUploadParameters} />,
            uploadMethodButton: "URL",
            uploadFn: (file: File) => {
                uploadByFile(null, {});
            },
        },
        url: {
            uploadMethodForm: <UrlUpload reportValidity={reportValidity} onParameterChange={setUploadParameters} />,
            uploadMethodButton: "File",
            uploadFn: async (json: UrlUploadDto) => {
                uploadByUrl(null, {
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
            map[uploadMethod].uploadFn(uploadParameters as UrlUploadDto);
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
