import { MusicPlayerControl, MusicItem, FrequencyGraph, Scrollable } from "./components";
import React from "react";
import { MusicContext } from "./contexts";

export default function App() {
    const audioRef = React.useRef(null);
    const musicContext = React.useContext(MusicContext);

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

    return (
        <div className="font-sans h-full flex flex-col fixed inset-0 justify-between" onKeyDown={onKeyDown} tabIndex={0}>
            <div className="overflow-hidden mt-4 relative">
                <div className="flex pl-4 pr-4 relative max-h-full gap-3">
                    <Scrollable className="grow basis-1">
                        <div className="transition-transform duration-1000">
                            <ul className="">
                                {musicContext.musicList.map((x, i) =>
                                    <MusicItem key={x.etag} id={x.etag} onClick={onSongSelect} index={i} name={/\/(?<filename>.*)\.mp3$/gi.exec(x.key)?.groups?.filename} />
                                )}
                            </ul>
                        </div>
                    </Scrollable>

                    <Scrollable className="grow tablet:grow-[2] desktop:grow-[3] basis-1">
                        <p className="text-white">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus blanditiis ab sed vel perspiciatis quis cum consequuntur veniam provident animi illum dolores quidem quas voluptate, hic dolorem excepturi culpa in porro. Amet nobis, reiciendis odio voluptas fuga error molestiae numquam omnis, aliquid dicta voluptate? Fugit ad ex consequuntur necessitatibus accusamus ab praesentium maiores ullam velit. Sequi ullam inventore nemo illo iusto aspernatur sed, nisi explicabo repellendus error dolor provident! Earum magnam quos ratione ullam suscipit, reprehenderit praesentium ipsam est labore aspernatur itaque officiis, necessitatibus id eum nam similique repellat. Distinctio, deserunt ratione unde optio, in corporis voluptatum aspernatur modi amet aliquid doloremque praesentium consequatur. Doloribus possimus, suscipit, praesentium nemo, aliquid totam cumque eius tempore nihil voluptas at. Eum, culpa quos. Reiciendis earum odio consequuntur dicta possimus, adipisci veritatis natus perferendis? Nulla fugiat autem hic vel voluptatibus dolorum nam culpa facere earum dolore animi voluptate minus, quibusdam iusto distinctio illum voluptatum quaerat alias est qui dignissimos molestias? Dignissimos mollitia quisquam repellendus placeat explicabo similique, minus incidunt ut commodi itaque sit esse officiis magni magnam animi repudiandae, iusto quo quaerat consequuntur laboriosam ratione voluptatum? Non, eius rem repudiandae neque dolorum blanditiis nobis? Quibusdam sint neque ratione, accusamus labore necessitatibus ea maxime eligendi sunt laboriosam perspiciatis expedita veritatis rerum iure. Eius ipsum exercitationem non natus ipsa dolore possimus aliquid, eveniet dicta minus cupiditate quod commodi molestiae aspernatur numquam libero aut inventore similique ullam alias ex fugiat! Incidunt est perferendis cupiditate molestias impedit cum dicta neque laboriosam obcaecati. Beatae sunt doloribus laborum magni enim, delectus illum praesentium, eos similique explicabo sit voluptatem doloremque eum. Aspernatur, doloremque illo quia magni quasi ducimus saepe ad voluptatibus molestias laboriosam rem omnis temporibus nesciunt adipisci. Id quod doloribus saepe dicta. Perspiciatis, placeat aspernatur tempora porro excepturi pariatur recusandae exercitationem neque nesciunt at quisquam tenetur, perferendis laborum hic quia saepe vero obcaecati omnis velit officia eveniet sint aliquam? Explicabo aut voluptatum nulla incidunt aliquam molestias mollitia velit temporibus? Mollitia, provident adipisci autem dolorem maxime, illum perspiciatis est voluptatum, id eligendi reprehenderit porro optio odio necessitatibus doloremque voluptatibus quisquam eveniet molestias iste reiciendis blanditiis nesciunt quam sunt consequatur! Mollitia eveniet et deleniti labore tempore officiis odio illum vero. Voluptate animi dolor eos! Explicabo perspiciatis sed praesentium repudiandae vel eaque officia esse ex non recusandae quis, debitis minima quasi, distinctio rerum laborum corporis dolorem! Odio, sed quasi eligendi temporibus cum non commodi animi ipsa fugiat incidunt molestiae. Est ea minus qui culpa enim similique! Ipsum, odio nihil perspiciatis, fuga perferendis officiis tenetur nulla saepe laboriosam similique, quidem alias unde velit? Commodi, nobis, mollitia aliquam ipsum dolor distinctio, vero voluptatibus enim aspernatur fuga veniam corporis facere est maxime! Repudiandae deleniti nihil deserunt, hic fuga, inventore, tempora a est laborum rem facere ducimus voluptatum sit expedita tempore consequatur quaerat officiis vel. Explicabo aliquid cum impedit asperiores incidunt, rem adipisci, totam minus sunt deserunt sit illum, placeat possimus similique mollitia expedita? Molestiae repellendus dicta libero ducimus aut magnam ad eaque delectus nam obcaecati sed, maxime officia suscipit adipisci nulla natus doloremque excepturi ut assumenda, explicabo ex omnis eveniet consequuntur distinctio! Alias dolorem iure perspiciatis architecto id nostrum, commodi possimus omnis eos mollitia magni debitis voluptatem facere qui minus culpa totam, provident, iste necessitatibus cupiditate! Quae sit deserunt beatae dicta cupiditate commodi et non, magni delectus quia libero labore doloribus rem tempore fuga quam, autem vero corporis error numquam, earum reprehenderit! Accusantium, in. Beatae, voluptatibus eveniet asperiores iusto cum incidunt eligendi error rerum? Beatae qui similique ratione dignissimos exercitationem repudiandae explicabo quo, recusandae laborum molestiae, quis sint tempora culpa eligendi unde iusto tempore quas eum vel? Necessitatibus ex expedita distinctio hic quidem quod, provident quo ipsam aliquam dignissimos laudantium amet omnis architecto ducimus doloribus delectus! Natus praesentium incidunt veritatis omnis labore maxime consequuntur numquam placeat magni voluptatem aliquid, et maiores quidem aut quam iure? Dolores natus esse nulla, inventore nobis hic possimus ab voluptatum magnam eum? Suscipit exercitationem excepturi tempora assumenda vel velit non temporibus eveniet nulla. Aperiam minima omnis neque ipsa molestias ea totam nostrum similique dolores! Iste fuga, quo ullam ea incidunt, provident officiis, amet dolorum ratione unde placeat eius magnam beatae quam iure exercitationem. Tempora commodi inventore debitis veritatis nostrum illo consequatur dignissimos magnam pariatur. Omnis vero blanditiis totam, aut aliquam nihil! Reprehenderit ipsa adipisci nam fuga rerum illum ad voluptate porro veniam. Aliquid ad praesentium sint animi a porro aliquam, quaerat debitis Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam excepturi doloribus maxime incidunt ullam culpa possimus? Quisquam quasi quidem, nihil dolor debitis quo accusamus, culpa adipisci eius, placeat accusantium! Repudiandae enim laboriosam illo mollitia qui molestias voluptas sit similique quidem esse! Quod, quas. Dignissimos rerum mollitia hic inventore minima voluptatem ratione? Voluptates pariatur omnis dolorum, nisi quibusdam quasi reprehenderit obcaecati consectetur temporibus aliquid hic vero eum inventore optio adipisci quae sunt tenetur ipsum corrupti cumque! Natus a consequatur, tempore harum corporis eum quo voluptate praesentium, impedit laborum eius expedita debitis sed ex id nisi quibusdam consequuntur aliquam, at dolorem nihil. Nostrum error illum vel minima, sequi recusandae. Optio fugit sit maxime harum. Saepe labore numquam soluta reprehenderit libero placeat minima voluptatum. Veniam, sint rerum dicta quisquam, nesciunt ullam maxime quidem fuga modi ducimus molestias exercitationem? Architecto possimus voluptas cumque placeat sapiente in, dicta obcaecati quae recusandae corporis magnam voluptatibus exercitationem voluptates! Sunt, explicabo in neque dicta optio aspernatur unde quae voluptas quam! Sit accusantium ea facilis, omnis quam debitis totam! Nihil, sit! Perspiciatis in corrupti accusantium ab unde. Totam reprehenderit, neque, ea quibusdam ipsa ut rerum expedita quae cum voluptatem aut doloribus ducimus voluptatibus, autem sequi iure inventore sint id?
                        </p>
                    </Scrollable>
                </div>
            </div>

            <div>
                <FrequencyGraph audioRef={audioRef} />
                <MusicPlayerControl ref={audioRef} />
            </div>
        </div>
    )
}
