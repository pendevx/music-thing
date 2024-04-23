type Props = {
    tailwindWidth: string,
    tailwindHeight: string,
    children: JSX.Element | JSX.Element[],
    id?: string
};

export default function({ tailwindWidth, tailwindHeight, children, id }: Props) {
    return (
        <div id={id || ""} class={`bg-gray-200 rounded-[50%] overflow-hidden p-3 w-${tailwindWidth} h-${tailwindHeight}`}>
            {children}
        </div>
    )
}
