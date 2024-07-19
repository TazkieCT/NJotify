import { IoCloseOutline } from "react-icons/io5";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
import style from "../../styles/widget/RightBarContent.module.css"
import useRightTabStore from "../../state/RightBarState";
import SongQueue from "./SongQueue";

const Queue = () => {
  const { closeRightTab } = useRightTabStore();
  return (
    <>
    <div className={`${style['flex-between']} ${style['sticky']}`}>
        <a className={style['header-text']}>Queue</a>
        <a className={style['header-button']}>
            <span className={style.medium} onClick={closeRightTab}><IoCloseOutline/></span>
        </a>
    </div>
    <div className={style['content-queue']}>
        <div className={style['padding-20']}>
            <div className={style.gap}>
                <div className={`${style['text-section']} ${style['white']} ${style['header-text']}`}>Now Playing</div>
                <div className={style.gap}>
                    <SongQueue/>
                </div>
            </div>
        </div>
        <div className={style['padding-20']}>
            <div className={style.gap}>
                <div className={`${style['text-section']} ${style['white']} ${style['header-text']}`}>Now Playing</div>
                <div className={style.gap}>
                    <SongQueue/>
                    <SongQueue/>
                    <SongQueue/>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Queue