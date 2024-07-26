import { IoSearch } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import style from "../../styles/layoutPage/LeftTab.module.css"
import { VscLibrary } from "react-icons/vsc";
import { FiPlus } from "react-icons/fi";
import { IoArrowForward } from "react-icons/io5";
import { LuList } from "react-icons/lu";
import usePageStore from "../../state/PageState";
import PlaylistItem from "../widget/PlaylistItem";
import { PiMusicNotesSimpleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../state/AccountState";

const LeftTab = () => {
  const page = usePageStore((state) => state.page)
  const changePage = usePageStore((state) => state.changePage)
  const navigate = useNavigate();
  const { user } = useUserStore();
  return (
    <div className={style.container}>
      <div className={style.navigation}>
        <a className={`${style.links} ${page === "home" ? (style.active) : ("")}`} onClick={() => {changePage("home"); navigate("/home")}}><span className={style.big}><GoHome /></span> Home</a>
        <a className={`${style.links} ${(page === "search" || page === "result") ? (style.active) : ("")}`} onClick={() => {changePage("search"); navigate("/search")}}><span className={style.big}><IoSearch /></span> Search</a>
        {user.Role === "artist" && (
          <a className={`${style.links} ${(page === "post") ? (style.active) : ("")}`} onClick={() => {changePage("post"); navigate("/post")}}><span className={style.big}><PiMusicNotesSimpleFill /></span> Your Music</a>
        )}
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
          <PlaylistItem/>
          <PlaylistItem/>
          <PlaylistItem/>
        </div>
      </div>
    </div>
  )
}

export default LeftTab