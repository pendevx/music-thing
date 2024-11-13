import { RaisedInputPlaceholder } from "../..";
import { UploaderProps } from "./types";

export default function UrlUpload({ reportValidity }: UploaderProps) {
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
