import { MusicPlayerControl, MusicItem, FrequencyGraph, createScrollable } from "./components";
import React from "react";
import { MusicContext } from "./contexts";
import localStorageRepository from "./repositories/LocalStorageRepository";

const Songlist = createScrollable();
const Lyrics = createScrollable();

export default function App() {
    const [showSonglist, setShowSonglist] = React.useState(localStorageRepository.get("showSonglist") ?? true);
    const [songlistWidth, setSonglistWidth] = React.useState(1500);
    const audioRef = React.useRef(null);
    const bodyRef = React.useRef(null);
    const songlistRef = React.useRef(null);
    const musicContext = React.useContext(MusicContext);

    React.useEffect(function() {
        setSonglistWidth(songlistRef.current.clientWidth);
    }, []);

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

    function showSonglistHandler() {
        console.log("clicked")
        setShowSonglist(!showSonglist);
    }

    return (
        <div className="font-sans h-full flex flex-col fixed inset-0 justify-between" onKeyDown={onKeyDown} tabIndex={0}>
            <div className="overflow-hidden mt-4">
                <div ref={bodyRef} className="flex pl-4 pr-4 relative max-h-full justify-end" style={{ width: `calc(100vw + ${songlistWidth}px)`, right: songlistWidth }}>
                    <Songlist ref={songlistRef} className="desktop:w-1/5 grow-0">
                        <div className="transition-transform duration-1000">
                            <ul>
                                {musicContext.musicList.map((x, i) =>
                                    <MusicItem key={x.etag} id={x.etag} onClick={onSongSelect} index={i} name={/\/(?<filename>.*)\.mp3$/gi.exec(x.key)?.groups?.filename} />
                                )}
                            </ul>
                        </div>
                    </Songlist>

                    <Lyrics className={`hidden tablet:flex desktop:w-3/5 text-white text-center grow-0 transition-all duration-1000 ${showSonglist ? "desktop:w-4/5" : ""}`} showScroller={false}>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <p>Doloremque veritatis mollitia quaerat nemo.</p>
                        <p>Dicta, autem modi. Praesentium, quasi.</p>
                        <p>Enim impedit beatae numquam quisquam!</p>
                        <p>Optio odio velit nam eaque.</p>
                        <p>Corrupti soluta illo officia consectetur!</p>
                        <p>Nostrum pariatur vel cupiditate natus!</p>
                        <p>Assumenda cumque natus blanditiis sapiente.</p>
                        <p>Eligendi eos sed tempore aut?</p>
                        <p>Incidunt et esse enim eius.</p>
                        <p>Magni expedita dignissimos ipsum voluptatibus?</p>
                        <p>Ullam nihil eaque quis aliquam.</p>
                        <p>Molestiae mollitia repellat voluptates quaerat.</p>
                        <p>Asperiores voluptatibus repellat alias at!</p>
                        <p>Vitae quia magnam ullam nemo.</p>
                        <p>Ipsam hic nulla iure dignissimos.</p>
                        <p>Rerum ad itaque ratione consectetur?</p>
                        <p>Commodi minima ab nisi quis.</p>
                        <p>Ex repellendus asperiores dignissimos rem.</p>
                        <p>Consequuntur ad ipsum et mollitia.</p>
                        <p>Odit dicta nesciunt quasi facere!</p>
                        <p>Obcaecati aut eum sequi repellat!</p>
                        <p>Fugiat autem dicta quasi ex.</p>
                        <p>Dignissimos facere voluptate doloremque delectus.</p>
                        <p>Consequuntur aspernatur quia ea vero.</p>
                        <p>Officiis blanditiis laborum quo culpa?</p>
                        <p>Voluptas vitae sit repellat esse.</p>
                        <p>Nihil ab quibusdam delectus quod!</p>
                        <p>Quibusdam ab commodi recusandae sed.</p>
                        <p>Repellendus magnam libero vitae vel!</p>
                        <p>Voluptas maxime iure mollitia nesciunt.</p>
                        <p>Sunt ipsum error eveniet sapiente.</p>
                        <p>Minima in rerum aliquid excepturi!</p>
                        <p>Et quis ea vitae veritatis?</p>
                        <p>Reiciendis adipisci ea atque minus?</p>
                        <p>Voluptates laudantium nostrum nulla quidem?</p>
                        <p>Eum consequuntur iste voluptatibus animi.</p>
                        <p>Ut ipsa laboriosam impedit iure?</p>
                        <p>Officia in consequuntur reiciendis laudantium.</p>
                        <p>Mollitia accusantium commodi harum eius.</p>
                        <p>Corrupti velit in ullam assumenda?</p>
                        <p>Dicta voluptates itaque placeat aut!</p>
                        <p>Odit a eaque placeat! Veniam.</p>
                        <p>Porro praesentium ratione recusandae quia.</p>
                        <p>Esse ea asperiores totam fugit?</p>
                        <p>Iure earum quas iusto necessitatibus?</p>
                        <p>Aspernatur voluptate doloribus unde ad!</p>
                        <p>Ipsa ad provident sint esse.</p>
                        <p>Suscipit cupiditate at earum repudiandae?</p>
                        <p>Molestias laboriosam ratione dolores nulla?</p>
                        <p>Temporibus molestias quibusdam dolorem est.</p>
                        <p>Accusamus a cumque quos labore?</p>
                        <p>Voluptate dolore est ullam quam.</p>
                        <p>Sunt temporibus dolorem ipsum illum.</p>
                        <p>Voluptatibus velit inventore dolores eius.</p>
                        <p>Adipisci, officia amet. Nobis, ipsa!</p>
                        <p>Ab nam eveniet asperiores repellat.</p>
                        <p>Odit accusamus quam explicabo molestiae!</p>
                        <p>Molestiae eos ipsam temporibus sapiente.</p>
                        <p>Neque laboriosam autem dolorem similique.</p>
                        <p>Quisquam impedit molestias ullam temporibus.</p>
                        <p>Repellendus porro exercitationem cupiditate adipisci?</p>
                        <p>Laborum temporibus quaerat magni dolorem.</p>
                        <p>Consectetur odio voluptatem cupiditate expedita!</p>
                        <p>Unde veniam accusamus sit eaque?</p>
                        <p>Tempora rem praesentium suscipit nemo!</p>
                        <p>Ducimus, accusantium! Sequi, tempore doloribus?</p>
                        <p>Quam, minima molestias? Repudiandae, blanditiis.</p>
                        <p>Corrupti distinctio perspiciatis ex optio?</p>
                        <p>Nobis vero sapiente ea facilis.</p>
                        <p>Nihil quas incidunt architecto? Fuga.</p>
                        <p>Molestias atque impedit recusandae sunt!</p>
                        <p>Rerum dignissimos dolores illo consequuntur!</p>
                        <p>Blanditiis explicabo voluptatibus consequuntur nam!</p>
                        <p>Eius, nemo blanditiis. Doloremque, quaerat.</p>
                        <p>Voluptatibus sit dicta maiores mollitia!</p>
                        <p>Ratione reprehenderit laudantium optio asperiores.</p>
                        <p>Provident accusamus eveniet perspiciatis ipsam.</p>
                        <p>Inventore incidunt laudantium qui eos!</p>
                        <p>Officiis repellat ullam eos sit!</p>
                        <p>Distinctio dolores excepturi facere animi?</p>
                        <p>Minus eos amet quo aliquid!</p>
                        <p>Sequi ut ex consectetur unde!</p>
                        <p>Distinctio expedita inventore nobis officiis!</p>
                        <p>Dignissimos, accusamus dicta! Possimus, repudiandae.</p>
                        <p>Ad non consequatur natus corporis.</p>
                        <p>Sed vero ut molestias eligendi.</p>
                        <p>Delectus mollitia error inventore voluptatem.</p>
                        <p>Illo vitae quaerat id eos!</p>
                        <p>Tempore ipsa ad quia reprehenderit.</p>
                        <p>Eveniet aliquam voluptas tenetur quos!</p>
                        <p>Placeat eos asperiores culpa debitis!</p>
                        <p>Delectus culpa placeat ab cum.</p>
                        <p>Accusantium commodi ex a rem.</p>
                        <p>Laudantium et minus vel distinctio?</p>
                        <p>Error iure molestiae hic ab.</p>
                        <p>Obcaecati distinctio pariatur esse ad!</p>
                        <p>Ut numquam maxime suscipit at!</p>
                        <p>Aliquid exercitationem voluptas obcaecati unde.</p>
                        <p>Perferendis adipisci magni soluta similique!</p>

                        <div className="absolute top-0 bottom-0 my-auto w-8 h-10 bg-[#0f0f0f] flex justify-center items-center"
                            onClick={showSonglistHandler}
                        >
                            <i className="border-l-[#a8a8a8] border-transparent border-solid border-[1em] w-0 h-0 translate-x-1/4" />
                        </div>
                    </Lyrics>
                </div>
            </div>

            <div>
                <FrequencyGraph audioRef={audioRef} />
                <MusicPlayerControl ref={audioRef} />
            </div>
        </div>
    )
}
