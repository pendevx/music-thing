export default function ({ item }: { item: { key: string } }) {
    return (
    <div class="">
        <a class="block pt-2 pb-2 pl-4 bg-[#363636] hover:bg-[#5e5e5e] transition-colors duration-200" 
        href="javascript:void(0)" 
        data-fetch={`https://music-worker.pendevx.workers.dev/${item.key}`}
        key={item.key}
        >
            {/\/(?<filename>.*)\.mp3/gi.exec(item.key)?.groups?.filename}
        </a>
    </div>
    );
}
