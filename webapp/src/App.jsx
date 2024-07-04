import { MusicPlayerControl, MusicItem, FrequencyGraph, createScrollable } from "./components";
import React from "react";
import { MusicContext } from "./contexts";
// import localStorageRepository from "./repositories/LocalStorageRepository";
import { debounce } from "./utils";

const Songlist = createScrollable();
const Lyrics = createScrollable();

const lyrics = [
    "Lorem ipsum dolor sit amet.",
    "Doloremque veritatis mollitia quaerat nemo.",
    "Dicta, autem modi. Praesentium, quasi.",
    "Enim impedit beatae numquam quisquam!",
    "Optio odio velit nam eaque.",
    "Corrupti soluta illo officia consectetur!",
    "Nostrum pariatur vel cupiditate natus!",
    "Assumenda cumque natus blanditiis sapiente.",
    "Eligendi eos sed tempore aut?",
    "Incidunt et esse enim eius.",
    "Magni expedita dignissimos ipsum voluptatibus?",
    "Ullam nihil eaque quis aliquam.",
    "Molestiae mollitia repellat voluptates quaerat.",
    "Asperiores voluptatibus repellat alias at!",
    "Vitae quia magnam ullam nemo.",
    "Ipsam hic nulla iure dignissimos.",
    "Rerum ad itaque ratione consectetur?",
    "Commodi minima ab nisi quis.",
    "Ex repellendus asperiores dignissimos rem.",
    "Consequuntur ad ipsum et mollitia.",
    "Odit dicta nesciunt quasi facere!",
    "Obcaecati aut eum sequi repellat!",
    "Fugiat autem dicta quasi ex.",
    "Dignissimos facere voluptate doloremque delectus.",
    "Consequuntur aspernatur quia ea vero.",
    "Officiis blanditiis laborum quo culpa?",
    "Voluptas vitae sit repellat esse.",
    "Nihil ab quibusdam delectus quod!",
    "Quibusdam ab commodi recusandae sed.",
    "Repellendus magnam libero vitae vel!",
    "Voluptas maxime iure mollitia nesciunt.",
    "Sunt ipsum error eveniet sapiente.",
    "Minima in rerum aliquid excepturi!",
    "Et quis ea vitae veritatis?",
    "Reiciendis adipisci ea atque minus?",
    "Voluptates laudantium nostrum nulla quidem?",
    "Eum consequuntur iste voluptatibus animi.",
    "Ut ipsa laboriosam impedit iure?",
    "Officia in consequuntur reiciendis laudantium.",
    "Mollitia accusantium commodi harum eius.",
    "Corrupti velit in ullam assumenda?",
    "Dicta voluptates itaque placeat aut!",
    "Odit a eaque placeat! Veniam.",
    "Porro praesentium ratione recusandae quia.",
    "Esse ea asperiores totam fugit?",
    "Iure earum quas iusto necessitatibus?",
    "Aspernatur voluptate doloribus unde ad!",
    "Ipsa ad provident sint esse.",
    "Suscipit cupiditate at earum repudiandae?",
    "Molestias laboriosam ratione dolores nulla?",
    "Temporibus molestias quibusdam dolorem est.",
    "Accusamus a cumque quos labore?",
    "Voluptate dolore est ullam quam.",
    "Sunt temporibus dolorem ipsum illum.",
    "Voluptatibus velit inventore dolores eius.",
    "Adipisci, officia amet. Nobis, ipsa!",
    "Ab nam eveniet asperiores repellat.",
    "Odit accusamus quam explicabo molestiae!",
    "Molestiae eos ipsam temporibus sapiente.",
    "Neque laboriosam autem dolorem similique.",
    "Quisquam impedit molestias ullam temporibus.",
    "Repellendus porro exercitationem cupiditate adipisci?",
    "Laborum temporibus quaerat magni dolorem.",
    "Consectetur odio voluptatem cupiditate expedita!",
    "Unde veniam accusamus sit eaque?",
    "Tempora rem praesentium suscipit nemo!",
    "Ducimus, accusantium! Sequi, tempore doloribus?",
    "Quam, minima molestias? Repudiandae, blanditiis.",
    "Corrupti distinctio perspiciatis ex optio?",
    "Nobis vero sapiente ea facilis.",
    "Nihil quas incidunt architecto? Fuga.",
    "Molestias atque impedit recusandae sunt!",
    "Rerum dignissimos dolores illo consequuntur!",
    "Blanditiis explicabo voluptatibus consequuntur nam!",
    "Eius, nemo blanditiis. Doloremque, quaerat.",
    "Voluptatibus sit dicta maiores mollitia!",
    "Ratione reprehenderit laudantium optio asperiores.",
    "Provident accusamus eveniet perspiciatis ipsam.",
    "Inventore incidunt laudantium qui eos!",
    "Officiis repellat ullam eos sit!",
    "Distinctio dolores excepturi facere animi?",
    "Minus eos amet quo aliquid!",
    "Sequi ut ex consectetur unde!",
    "Distinctio expedita inventore nobis officiis!",
    "Dignissimos, accusamus dicta! Possimus, repudiandae.",
    "Ad non consequatur natus corporis.",
    "Sed vero ut molestias eligendi.",
    "Delectus mollitia error inventore voluptatem.",
    "Illo vitae quaerat id eos!",
    "Tempore ipsa ad quia reprehenderit.",
    "Eveniet aliquam voluptas tenetur quos!",
    "Placeat eos asperiores culpa debitis!",
    "Delectus culpa placeat ab cum.",
    "Accusantium commodi ex a rem.",
    "Laudantium et minus vel distinctio?",
    "Error iure molestiae hic ab.",
    "Obcaecati distinctio pariatur esse ad!",
    "Ut numquam maxime suscipit at!",
    "Aliquid exercitationem voluptas obcaecati unde.",
    "Perferendis adipisci magni soluta similique!"
]

export default function App() {
    const [showSonglist, setShowSonglist] = React.useState(true);
    const [songlistWidth, setSonglistWidth] = React.useState(0);
    const audioRef = React.useRef(null);
    const bodyRef = React.useRef(null);
    const songlistRef = React.useRef(null);
    const musicContext = React.useContext(MusicContext);

    React.useEffect(function () {
        setSonglistWidth(songlistRef.current.clientWidth);
        const onResize = debounce(() => {
            setSonglistWidth(songlistRef.current?.clientWidth || 0);
            window.removeEventListener("resize", onResize);
        }, 500);

        window.addEventListener("resize", onResize);
    }, [songlistWidth]);

    function onSongSelect(index) {
        musicContext.selectSongAndPlay(index);
    }

    function onKeyDown(e) {

        switch (e.key) {
            case " ": {
                e.preventDefault();

                if (musicContext.currentSong.key == null) {
                    musicContext.next();
                } else {
                    musicContext.isPlaying ? musicContext.pause() : musicContext.play();
                }
                break;
            }
        }
    }

    const matches = matchMedia("(max-width: 768px)").matches;

    return (
        <div className="font-sans h-full flex flex-col fixed inset-0 justify-between" onKeyDown={onKeyDown} tabIndex={0}>
            <div className="overflow-hidden mt-4">
                <div ref={bodyRef} className="flex relative max-h-full justify-end" style={{ width: matches ? "" : `calc(100vw + ${songlistWidth}px)`, right: matches ? 0 : songlistWidth }}>
                    <Songlist ref={songlistRef} className={`absolute z-10 bg-black inset-0 laptop:relative -translate-x-full laptop:translate-x-0 laptop:flex laptop:w-1/4 desktop:w-1/5 laptop:grow-0 laptop:pr-0 px-4 transition-all duration-1000
                        ${showSonglist ? "translate-x-0" : ""}`}
                    >
                        <div className="transition-transform duration-1000">
                            <ul>
                                {musicContext.musicList.map((x, i) =>
                                    <MusicItem key={x.etag} id={x.etag} onClick={onSongSelect} index={i} name={/\/(?<filename>.*)\.mp3$/gi.exec(x.key)?.groups?.filename} />
                                )}
                            </ul>
                        </div>
                    </Songlist>

                    <Lyrics className={`laptop:flex w-full laptop:w-2/4 desktop:w-3/5 text-white text-center grow laptop:grow-0 transition-all duration-1000 laptop:pl-0 px-4
                        ${showSonglist ? "laptop:w-3/4 desktop:w-4/5" : ""}`}
                    >
                        <div className="max-h-full">
                            {lyrics.map((line, i) => <p key={i} className="mb-5">{line}</p>)}
                        </div>

                        <div className="hidden laptop:flex absolute top-0 bottom-0 my-auto w-8 h-10 bg-[#0f0f0f] justify-center items-center"
                            onClick={() => setShowSonglist(!showSonglist)}
                        >
                            <i className="border-l-[#a8a8a8] border-transparent border-solid border-[1em] w-0 h-0 translate-x-1/4" />
                        </div>
                    </Lyrics>

                    <div className="flex laptop:hidden absolute z-20 top-2 right-4 my-auto w-8 h-10 bg-[#0f0f0f] justify-center items-center rotate-180"
                        onClick={() => setShowSonglist(!showSonglist)}
                    >
                        <i className="border-l-[#a8a8a8] border-transparent border-solid border-[1em] w-0 h-0 translate-x-1/4" />
                    </div>
                </div>
            </div>

            <div>
                <FrequencyGraph audioRef={audioRef} />
                <MusicPlayerControl ref={audioRef} />
            </div>
        </div>
    )
}
