export default function CircularSvg({ width, height, children, className, selected, onClick }) {
    return (
        <div className={`bg-slate-300 rounded-[50%] overflow-hidden p-3 ${className ? className : ""} ${selected ? "bg-[radial-gradient(#00EAFF_65%,#00B0F0_65%,#00B0F0_100%)] fill-[#5c5c5c]" : "fill-black"}`} onClick={onClick} style={{ width, height }}>
            {children}
        </div>
    )
}
