import React from "react";
import { AccountSettingsContext } from "./KeyedForm";

type ValiditableFormProps = {
    colorClass?: string;
    reportValidity: (id: number, value: boolean) => void;
    index: number;
};

type RaisedInputPlaceholderProps = ValiditableFormProps & React.InputHTMLAttributes<HTMLInputElement>;

export default function RaisedInputPlaceholder({ className, placeholder, colorClass, reportValidity, index, ...props }: RaisedInputPlaceholderProps) {
    const [value, setValue] = React.useState<string>("");
    const [key, setKey] = React.useState<number>(0);
    const [valid, setValid] = React.useState<boolean>(true);
    const ctx = React.useContext(AccountSettingsContext);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const curValue = e.target.value;

        setValue(curValue);
        const validity = e.target.checkValidity();

        if (reportValidity) {
            reportValidity(index, validity);
        }

        if (curValue) {
            setValid(validity);
        } else {
            setValid(true);
        }
    };

    if (key !== ctx) {
        setKey(ctx);
        setValue("");
        setValid(true);
    }

    const isRaised = value.length > 0;
    let style: React.CSSProperties = {};
    if (!valid) {
        style.borderColor = "red";
    }

    return (
        <label className={`group relative cursor-text ${className}`} style={style}>
            <span
                className={`absolute my-auto origin-left cursor-text align-bottom transition-transform duration-300 group-focus-within:-translate-y-4 group-focus-within:scale-90 ${colorClass} ${isRaised && "-translate-y-4 scale-90"}`}>
                {placeholder}
            </span>
            <input className={`h-full w-full cursor-text ${colorClass}`} {...props} onChange={onChangeHandler} key={ctx} />
        </label>
    );
}
