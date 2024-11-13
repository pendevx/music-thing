import { RaisedInputPlaceholder } from "../..";
import { UploaderProps } from "./types";

export default function FileUpload({ reportValidity }: UploaderProps) {
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
