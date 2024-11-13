import { RaisedInputPlaceholder } from "../..";
import { UploaderProps } from "./types";

export default function UrlUpload({ reportValidity }: UploaderProps) {
    const options = ["YouTube", "YouTube Music", "Soundcloud"];

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
                reportValidity={reportValidity}
            />

            <div className="grid grid-cols-2 gap-4">
                <RaisedInputPlaceholder
                    className="block w-full rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white p-2"
                    colorClass="text-white bg-[#080808] px-2 h-fit bottom-0 top-0 "
                    index={1}
                    placeholder="URL"
                    required
                    type="url"
                    name="url"
                    reportValidity={reportValidity}
                />

                <select name="source" className="block w-full rounded-br-lg rounded-tl-lg border-[1px] border-solid border-white p-2 text-white" onChange={e => reportValidity(2, !!e.target.value)}>
                    <option className="text-black" value="">
                        Please select
                    </option>
                    {options.map((option, i) => (
                        <option key={option} className="text-black" value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
