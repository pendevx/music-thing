export default function CircularSvg({ width, height, children, id, className }) {
    return (
        <div id={id || ""} className={`bg-gray-200 rounded-[50%] overflow-hidden p-3 ${className}`} style={{ width, height }}>
            {children}
        </div>
    )
}
