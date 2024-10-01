import React from "react";

type RaisedInputPlaceholderProps = {
    className?: string;
    placeholder?: string;
    colorClass?: string;
    reportValidity?: (id: number, value: boolean) => void;
    index: number;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function RaisedInputPlaceholder({ className, placeholder, colorClass, reportValidity, index, ...props }: RaisedInputPlaceholderProps) {
    const [value, setValue] = React.useState<string>("");

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (reportValidity) {
            reportValidity(index, e.target.checkValidity());
        }
    };

    const isRaised = value.length > 0;

    return (
        <label className={`group relative cursor-text ${className}`}>
            <span
                className={`absolute my-auto origin-left cursor-text align-bottom transition-transform duration-300 group-focus-within:-translate-y-4 group-focus-within:scale-90 ${colorClass} ${isRaised && "-translate-y-4 scale-90"}`}>
                {placeholder}
            </span>
            <input className={`w-full cursor-text ${colorClass}`} {...props} onChange={onChangeHandler} />
        </label>
    );
}
