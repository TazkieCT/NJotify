import { IoSearch } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import style from "../styles/LayoutPage/LeftTab.module.css"
import { VscLibrary } from "react-icons/vsc";
import { BsPlusLg } from "react-icons/bs";

const LeftTab = () => {
  return (
    <div className={style.container}>
      <div className={style.navigation}>
        <a className={style.links}><span className={style.big}><GoHome /></span> Home</a>
        <a className={style.links}><span className={style.big}><IoSearch /></span> Search</a>
      </div>
      <div className={style.library}>
        <a className={style.links}><span className={style.big}><VscLibrary /></span> Your Library</a>
        <BsPlusLg/>
      </div>
    </div>
  )
}

export default LeftTab