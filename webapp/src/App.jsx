import {
    MusicPlayerControl,
    MusicItem,
    FrequencyGraph,
    createScrollable,
} from "./components"
import React from "react"
import { MusicContext } from "./contexts"
import { SongList } from "./icons"

const Songlist = createScrollable()
const Lyrics = createScrollable()

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
    "Perferendis adipisci magni soluta similique!",
]

export default function App() {
    const [showSonglist, setShowSonglist] = React.useState(true)
    const audioRef = React.useRef(null)
    const bodyRef = React.useRef(null)
    const songlistRef = React.useRef(null)
    const musicContext = React.useContext(MusicContext)

    function onSongSelect(index) {
        musicContext.selectSongAndPlay(index)
    }

    function onKeyDown(e) {
        switch (e.key) {
            case " ": {
                e.preventDefault()

                if (musicContext.currentSong.key == null) {
                    musicContext.next()
                } else {
                    musicContext.isPlaying
                        ? musicContext.pause()
                        : musicContext.play()
                }
                break
            }
        }
    }

    return (
        <div
            className="fixed inset-0 flex h-full flex-col justify-between font-sans"
            onKeyDown={onKeyDown}
            tabIndex={0}
        >
            <div className="mt-4 overflow-hidden">
                <div
                    ref={bodyRef}
                    className="r-0 relative flex max-h-full w-full justify-end laptop:right-[33.33333%] laptop:w-[133.33333%] desktop:right-[25%] desktop:w-[125%]"
                >
                    <Songlist
                        ref={songlistRef}
                        className={`absolute inset-0 z-10 -translate-x-full bg-black px-4 transition-all duration-1000 laptop:relative laptop:flex laptop:w-1/4 laptop:grow-0 laptop:translate-x-0 laptop:pr-0 desktop:w-1/5 ${showSonglist && "translate-x-0"}`}
                    >
                        <div className="transition-transform duration-1000">
                            <ul>
                                {musicContext.musicList.map((x, i) => (
                                    <MusicItem
                                        key={x.etag}
                                        id={x.etag}
                                        onClick={onSongSelect}
                                        index={i}
                                        name={
                                            /\/(?<filename>.*)\.mp3$/gi.exec(
                                                x.key
                                            )?.groups?.filename
                                        }
                                    />
                                ))}
                            </ul>
                        </div>
                    </Songlist>

                    <Lyrics
                        className={`relative flex w-full px-4 text-center text-white transition-all duration-1000 laptop:w-2/4 laptop:grow-0 laptop:pl-0 desktop:w-3/5 ${!showSonglist && "laptop:w-3/4 desktop:w-4/5"}`}
                        showScroller={false}
                    >
                        {lyrics.map((line, i) => (
                            <p key={i} className="mb-5">
                                {line}
                            </p>
                        ))}

                        <div
                            className="absolute bottom-0 left-1 top-0 my-auto hidden h-8 w-8 items-center justify-center bg-[#0f0f0f] laptop:flex"
                            onClick={() => setShowSonglist(!showSonglist)}
                        >
                            <SongList />
                        </div>
                    </Lyrics>

                    <div
                        className={`fixed z-20 my-auto flex h-12 w-12 items-center justify-center bg-[#0f0f0f] transition-all duration-1000 laptop:hidden ${showSonglist ? "right-8 top-8" : "right-6 top-6"}`}
                        onClick={() => setShowSonglist(!showSonglist)}
                    >
                        <SongList />
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
