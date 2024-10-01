import React from "react";
import { AccountSettingsContext } from "./modals/SettingsModalTabs/Account";

type RaisedInputPlaceholderProps = {
    className?: string;
    placeholder?: string;
    colorClass?: string;
    reportValidity?: (id: number, value: boolean) => void;
    index: number;
    name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function RaisedInputPlaceholder({ className, placeholder, colorClass, reportValidity, index, name, ...props }: RaisedInputPlaceholderProps) {
    const [value, setValue] = React.useState<string>("");
    const [key, setKey] = React.useState<number>(0);
    const ctx = React.useContext(AccountSettingsContext);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (reportValidity && value) {
            reportValidity(index, e.target.checkValidity());
        }
    };

    if (key !== ctx) {
        setKey(ctx);
        setValue("");
    }

    const isRaised = value.length > 0;

    return (
        <label className={`group relative cursor-text ${className}`}>
            <span
                className={`absolute my-auto origin-left cursor-text align-bottom transition-transform duration-300 group-focus-within:-translate-y-4 group-focus-within:scale-90 ${colorClass} ${isRaised && "-translate-y-4 scale-90"}`}>
                {placeholder}
            </span>
            <input className={`w-full cursor-text ${colorClass}`} {...props} onChange={onChangeHandler} name={name} key={ctx} />
        </label>
    );
}
