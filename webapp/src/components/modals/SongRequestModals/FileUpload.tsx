import { RaisedInputPlaceholder } from "../..";
import { UploaderProps } from "./types";
import useFileUpload from "../../../hooks/useFileUpload";
import { UploadSong } from "../../../icons";

export default function FileUpload({ reportValidity }: UploaderProps) {
    const { file, handleFileChange } = useFileUpload();

    return (
        <div className="flex flex-col gap-4">
            <RaisedInputPlaceholder
                className="block w-full rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white p-2"
                colorClass="text-white bg-[#080808] px-2 h-fit bottom-0 top-0 "
                index={0}
                placeholder="Title"
                required
                type="text"
                name="title"
                onchange={reportValidity}
            />

            <label className="relative bottom-0 top-0 block h-40 rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white p-2 text-white">
                <input
                    type="file"
                    name="file"
                    required
                    className="absolute inset-0 hidden"
                    onChange={e => {
                        handleFileChange(e);
                        reportValidity(1, !!e.target.value);
                    }}
                />
                <div className="absolute inset-0 m-auto flex items-center justify-center gap-2">
                    {file ? (
                        <h4 className="text-xl">{file?.name}</h4>
                    ) : (
                        <>
                            <UploadSong className="h-10 w-fit" />
                            <p className="text-2xl">Choose a file</p>
                        </>
                    )}
                </div>
            </label>
        </div>
    );
}
