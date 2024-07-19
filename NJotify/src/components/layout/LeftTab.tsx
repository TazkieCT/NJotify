import { IoSearch } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import style from "../../styles/layoutPage/LeftTab.module.css"
import { VscLibrary } from "react-icons/vsc";
import { FiPlus } from "react-icons/fi";
import { IoArrowForward } from "react-icons/io5";
import { LuList } from "react-icons/lu";
import usePageStore from "../../state/PageState";


const LeftTab = () => {
  const page = usePageStore((state) => state.page)
  const changePage = usePageStore((state) => state.changePage)

  return (
    <div className={style.container}>
      <div className={style.navigation}>
        <a className={`${style.links} ${page === "home" ? (style.active) : ("")}`} onClick={() => {changePage("home");}}><span className={style.big}><GoHome /></span> Home</a>
        <a className={`${style.links} ${page === "search" ? (style.active) : ("")}`} onClick={() => {changePage("search");}}><span className={style.big}><IoSearch /></span> Search</a>
      </div>
      <div className={style.library}>
        <div className={style['flex-between']}>
          <a className={style.links}><span className={style.big}><VscLibrary /></span> Your Library</a>
          <a className={style['lib-button']}>
            <span className={style.medium}><FiPlus/></span>
            <span className={style.medium}><IoArrowForward/></span>
          </a>
        </div>
        <div className={style.album}>
          <div className={`${style['flex-between']} ${style['mb-10']}`}>
            <a className={style.medium}><IoSearch /></a>
            <a className={style.recent}>Recents<span className={style.medium}><LuList/></span></a>
          </div>
          <div className={style.item}>
            <img className={style['album-cover']} width={40} src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg" alt="" />
            <div className={style.col}>
              <span className={style['album-title']}>My Playlist</span>
              <span className={style['album-subtitle']}>Playlist • User</span>
            </div>
          </div>
          <div className={style.item}>
            <img className={style['album-cover']} width={40} src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg" alt="" />
            <div className={style.col}>
              <span className={style['album-title']}>My Playlist</span>
              <span className={style['album-subtitle']}>Playlist • User</span>
            </div>
          </div>
          <div className={style.item}>
            <img className={style['album-cover']} width={40} src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg" alt="" />
            <div className={style.col}>
              <span className={style['album-title']}>My Playlist</span>
              <span className={style['album-subtitle']}>Playlist • User</span>
            </div>
          </div>
          <div className={style.item}>
            <img className={style['album-cover']} width={40} src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg" alt="" />
            <div className={style.col}>
              <span className={style['album-title']}>My Playlist</span>
              <span className={style['album-subtitle']}>Playlist • User</span>
            </div>
          </div>
          <div className={style.item}>
            <img className={style['album-cover']} width={40} src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg" alt="" />
            <div className={style.col}>
              <span className={style['album-title']}>My Playlist</span>
              <span className={style['album-subtitle']}>Playlist • User</span>
            </div>
          </div>
          <div className={style.item}>
            <img className={style['album-cover']} width={40} src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg" alt="" />
            <div className={style.col}>
              <span className={style['album-title']}>My Playlist</span>
              <span className={style['album-subtitle']}>Playlist • User</span>
            </div>
          </div>
          <div className={style.item}>
            <img className={style['album-cover']} width={40} src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg" alt="" />
            <div className={style.col}>
              <span className={style['album-title']}>My Playlist</span>
              <span className={style['album-subtitle']}>Playlist • User</span>
            </div>
          </div>
          <div className={style.item}>
            <img className={style['album-cover']} width={40} src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg" alt="" />
            <div className={style.col}>
              <span className={style['album-title']}>My Playlist</span>
              <span className={style['album-subtitle']}>Playlist • User</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftTab