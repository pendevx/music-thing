import React from "react";

export default function useValidateForm(length: number, key: any) {
    const [valid, setValid] = React.useState<boolean[]>([]);
    const [formValid, setFormValid] = React.useState(false);

    const reportValidity = (id: number, v: boolean) => {
        const newValid = [...valid];
        newValid[id] = v;
        setValid(newValid);

        setFormValid(newValid.every(x => x));
    };

    return { formValid, reportValidity };
}
