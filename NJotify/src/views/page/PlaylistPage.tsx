import { FaPlay } from "react-icons/fa6"
import Footer from "../../components/layout/Footer"
import style from "../../styles/page/TrackPage.module.css"
import { RxDotsHorizontal } from "react-icons/rx"
import { BsPlusCircle } from "react-icons/bs";
import { LuList } from "react-icons/lu";
import { LuClock3 } from "react-icons/lu";
import SongRowPlaylist from "../../components/widget/SongRowPlaylist";


const PlaylistPage = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
          <div className={style['profile-avatar']}>
            <img src="https://images.genius.com/2707aecb3f04d3d0ba5cd4432b7442e4.516x517x1.png" className={style['profile-image']} alt="" />
          </div>
          <div className={style['profile-info']}>
            <span className={`${style.small}`}>Playlist</span>
            <span className={`${style.title}`}>my insecurities not yours</span>
            <span className={`${style.small} ${style.gray} ${style['hdesc-2']}`}>I'd be sad if you were gone</span>
            <span className={style.small}>XIO · 19,131 likes · 5 Songs · 25 min 7 sec</span>
          </div>
        </div>
        <div className={`${style.section} ${style['gap-2']} ${style['flex-col']}`}>
            <div className={`${style['pad-lu']}`}>
                <div className={`${style['flex-between']}`}>
                    <div className={`${style['flex']} ${style['gap-20']}`}>
                        <span className={style['play-btn']}><FaPlay/></span>
                        <span className={style.medium}><BsPlusCircle/></span>
                        <span className={style.medium}><RxDotsHorizontal/></span>
                    </div>
                    <div className={style['menu-item']}>List <span><LuList/></span></div>
                </div>
            </div>
            <div className={`${style['pad-lu']} ${style['flex-col']}`}>
              <div className={style["song-row"]}>
                <div className={style["song-number-playlist"]}>#</div>
                <div className={style["song-name-playlist"]}>
                  <div className={style.artist}>Title</div>
                </div>
                <div className={style["song-album-playlist"]}>Album</div>
                <div className={style["song-date-playlist"]}>Date added</div>
                <div className={style["song-duration-playlist"]}><LuClock3/></div>
              </div>
              <hr className={`${style.hr} ${style['mb-2']}`}/>
              <SongRowPlaylist/>
              <SongRowPlaylist/>
              <SongRowPlaylist/>
              <SongRowPlaylist/>
            </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default PlaylistPage