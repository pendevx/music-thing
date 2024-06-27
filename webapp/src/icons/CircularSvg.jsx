export default function CircularSvg({ width, height, children, id }) {
    return (
        <div id={id || ""} className={`bg-gray-200 rounded-[50%] overflow-hidden p-3`} style={{ width, height }}>
            {children}
        </div>
    )
}
