export default function CircularSvg({ width, height, children, className, onClick }) {
    return (
        <div className={`rounded-[50%] overflow-hidden p-3 fill-[#000000] ${className ? className : ""}`} onClick={onClick} style={{ width, height }}>
            {children}
        </div>
    )
}
