import React from "react";
import RaisedInputPlaceholder from "./RaisedInputPlaceholder";

type FormField = {
    placeholder: string;
    type: string;
    required: boolean;
    name: string;
};

export type ReportValidity = {
    (subformValid: boolean): void;
};

export default function ValidatableForm({ fields, reportValidity }: { fields: FormField[]; reportValidity: ReportValidity }) {
    const [valid, setValid] = React.useState<boolean[]>(Array(fields.length).fill(false));

    const checkValidity = (id: number, v: boolean) => {
        const newValid = [...valid];
        newValid[id] = v;
        setValid(newValid);

        reportValidity(newValid.every(x => x));
    };

    return (
        <div className="grid w-full grid-cols-2 gap-4">
            {fields.map((field, i) => (
                <RaisedInputPlaceholder
                    key={i}
                    placeholder={field.placeholder}
                    className="w-full border-[1px] border-solid border-white p-2"
                    colorClass="text-white bg-[#080808] px-2"
                    reportValidity={checkValidity}
                    index={i}
                    type={field.type}
                    required={field.required}
                    name={field.name}
                />
            ))}
        </div>
    );
}
