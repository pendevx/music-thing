import React from "react";

type RaisedInputPlaceholderProps = {
    className?: string;
    placeholder?: string;
    colorClass?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function RaisedInputPlaceholder({ className, placeholder, colorClass, ...props }: RaisedInputPlaceholderProps) {
    const [value, setValue] = React.useState<string>("");

    const isRaised = value.length > 0;

    return (
        <label className={`group relative ${className}`}>
            <span
                className={`absolute my-auto cursor-text align-bottom transition-transform duration-300 group-focus-within:-translate-y-4 group-focus-within:scale-90 ${colorClass} ${isRaised && "-translate-y-4 scale-90"}`}>
                {placeholder}
            </span>
            <input className={`cursor-text ${colorClass}`} {...props} onChange={e => setValue(e.target.value)} />
        </label>
    );
}
