import { FaPlay } from "react-icons/fa6"
import Footer from "../../components/layout/Footer"
import style from "../../styles/page/TrackPage.module.css"
import { RxDotsHorizontal } from "react-icons/rx"
import { BsPlusCircle } from "react-icons/bs";
import SongRowAlbum from "../../components/widget/SongRowAlbum";
import AlbumCard from "../../components/widget/AlbumCard";
import { LuList } from "react-icons/lu";
import { LuClock3 } from "react-icons/lu";


const AlbumPage = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
          <div className={style['profile-avatar']}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1pgW0XW3EnXrGBDYcfeKVESLSSuRyptRrQ&s" className={style['profile-image']} alt="" />
          </div>
          <div className={style['profile-info']}>
            <span className={`${style.small}`}>Album</span>
            <span className={`${style.title} ${style['mb-2']}`}>as long as you're okay</span>
            <span className={style.small}>Slchld · 2020 · 5 Songs · 25 min 7 sec</span>
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
                    <div className={style['menu-item']}>List <span className={style['box-icon']}><LuList/></span></div>
                </div>
            </div>
            <div className={`${style['pad-lu']} ${style['flex-col']}`}>
              <div className={style["song-row"]}>
                <div className={style["song-number-album"]}>#</div>
                <div className={style["song-name-album"]}>
                  <div className={style.artist}>Title</div>
                </div>
                <div className={style["song-duration-album"]}><LuClock3/></div>
              </div>
              <hr className={`${style.hr} ${style['mb-2']}`}/>
              <SongRowAlbum/>
              <SongRowAlbum/>
              <SongRowAlbum/>
              <SongRowAlbum/>
            </div>
            <div className={`${style['pad-lu']}`}>
              <div className={`${style['flex-between']}`}> 
                <div className={`${style['flex-col']}`}>
                  <span className={style['license']}>March 6, 2024</span>
                  <span className={style['license']}>&copy; 2024 Vingolf Recordings under exclusive license to AWAL Recordings America, Inc.</span>
                  <span className={style['license']}>&copy; 2024 Vingolf Recordings under exclusive license to AWAL Recordings America, Inc.</span>
                </div>
              </div>
            </div>
            <div className={`${style['pad-lu']} ${style['flex-col']}`}>
                <div className={`${style['flex-between']}`}>
                    <span className={style.name}>More by Keshi</span>
                    <span className={`${style['gray']} ${style['see-more']}`}>See discography</span>
                </div>
              <div className={`${style.flex} `}>
                <AlbumCard/>
                <AlbumCard/>
                <AlbumCard/>
                <AlbumCard/>
              </div>
            </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default AlbumPage