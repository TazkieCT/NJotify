import style from "../../styles/page/ArtistPage.module.css"
import usePageStore from "../../state/PageState"
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa6";
import { RxDotsHorizontal } from "react-icons/rx";
import SongRow from "../../components/widget/SongRow";
import AlbumCard from "../../components/widget/AlbumCard";
import Footer from "../../components/layout/Footer";

const ArtistPage = () => {
  // const changePage = usePageStore((state) => state.changePage)
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={`${style['header']} ${style['gap-2']}`}>
          <div className={`${style['flex']} ${style['gap-2']}`}><span className={style['verif-icon']}><VscVerifiedFilled /></span> Verified Artist</div>
            <span className={style.title}>Sang Artist</span>
            <span>1,778,185 monthly listeners</span>
            {/* <button onClick={(e) => {
              e.preventDefault();
              changePage("home");
            }}>Back Home Page</button> */}
          </div>
          <div className={`${style['pad-content']} ${style['flex-column']} ${style['gap-3']}`}>
            <div className={`${style.flex} ${style['gap-20']} ${style['pad-up']}`}>
              <span className={style['play-btn']}><FaPlay/></span>
              <span className={style['follow-btn']}>Follow</span>
              <span className={style.medium}><RxDotsHorizontal/></span>
            </div>
            <div className={`${style['flex-column']} ${style['gap-3']}`}>
              <span className={style['title-content']}>Popular</span>
              <div className={style['song-list']}>
                <SongRow/>
                <SongRow/>
              </div>
            </div>
            <div className={`${style['flex-column']} ${style['gap-3']}`}>
              <span className={style['title-content']}>Discography</span>
              <div className={`${style['flex']} ${style['gap-3']} ${style['pad-col']}`}>
                <AlbumCard/>
                <AlbumCard/>
                <AlbumCard/>
                <AlbumCard/>
                <AlbumCard/>
              </div>
            </div>
            <div className={`${style['flex-column']} ${style['gap-3']}`}>
              <span className={style['title-content']}>Featuring Sang Artist</span>
              <div className={`${style['flex']} ${style['gap-3']} ${style['pad-col']}`}>
                <AlbumCard/>
              </div>
            </div>
          </div>
          <Footer/>
      </div>
    </div>
  )
}

export default ArtistPage