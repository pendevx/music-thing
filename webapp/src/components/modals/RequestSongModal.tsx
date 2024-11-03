export default function RequestSongModal() {
    return (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
            <div className="h-96 w-96 rounded-lg bg-[#121212]">
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-2xl font-bold">Upload Song</h1>
                    <button className="text-white" onClick={() => console.log("close")}>
                        Close
                    </button>
                </div>
                <div className="p-4">
                    <input type="file" />
                </div>
            </div>
        </div>
    );
}
