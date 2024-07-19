import { IoCloseOutline } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import style from "../../styles/widget/RightBarContent.module.css"
import useRightTabStore from "../../state/RightBarState";

const Ads = () => {
  const { closeRightTab } = useRightTabStore();
  return (
    <>
    <div className={`${style['flex-between']} ${style['sticky']}`}>
        <a className={`${style['header-text']} ${style['smaller']}`}>Your music will continue after the break</a>
        <a className={style['header-button']}>
            <span className={style.medium} onClick={closeRightTab}><IoCloseOutline/></span>
        </a>
    </div>
    <div className={style.content}>
        <div className={style.album}>
            <img className={style['album-cover']} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoSU5XB6U6VxLt9dMLT6gCUJDXsrzvm1Bp8g&s" alt="" />
            <span className={style.title}>Spotify</span>
            <span className={style.subtitle}>Advertisement</span>
            <div className={`${style['pt-20']}`}>
                <div className={`${style['flex-between']} ${style['learn-more']}`}>
                    <span className={`${style['white']} ${style['line-h0']}`}>Learn More</span>
                    <span className={`${style['white']} ${style['align-center']}`}><SlArrowRight/></span>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Ads