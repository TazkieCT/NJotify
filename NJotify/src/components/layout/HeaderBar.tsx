import style from "../../styles/LayoutPage/HeaderBar.module.css"
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const HeaderBar = () => {
  return (
    <div className={`${style.header} ${style['flex-between']}`}>
        <div className={style.flex}>
          <span className={style['page-button']}><GrPrevious/></span>
          <span className={style['page-button']}><GrNext/></span>
        </div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Vd_kqZn53ok20t0tVuAukGAHOzVLWvNgKw&s" className={style['profile-icon']} alt="" />
    </div>
  )
}

export default HeaderBar