import style from "../styles/LayoutPage/MainTab.module.css"
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const MainTab = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={`${style.header} ${style['flex-between']}`}>
          <div className={style.flex}>
            <span className={style['page-button']}><GrPrevious/></span>
            <span className={style['page-button']}><GrNext/></span>
          </div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Vd_kqZn53ok20t0tVuAukGAHOzVLWvNgKw&s" className={style['profile-icon']} alt="" />
        </div>
      </div>
    </div>
  )
}

export default MainTab