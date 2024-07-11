import style from "../styles/LayoutPage/RightTab.module.css"
import { IoCloseOutline } from "react-icons/io5";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RxDotsHorizontal } from "react-icons/rx";

const RightTab = () => {
  return (
    <div className={style.container}>
      <div className={style['header-content']}>
        <div className={`${style['flex-between']} ${style['sticky']}`}>
          <a className={style['header-text']}>RADWIMPS</a>
          <a className={style['header-button']}>
            <span className={style.medium}><RxDotsHorizontal/></span>
            <span className={style.medium}><IoCloseOutline/></span>
            {/* <span className={style.medium}><IoArrowForward/></span> */}
          </a>
        </div>
        <div className={style.content}>
          <div className={style.album}>
            <img className={style['album-cover']} src="https://upload.wikimedia.org/wikipedia/id/thumb/c/c2/Radwimps_Your_Name_Album_Cover.jpg/220px-Radwimps_Your_Name_Album_Cover.jpg" alt="" />
            <span className={style.title}>Sparkle - movie ver.</span>
            <span className={style.subtitle}>RADWIMPS</span>
          </div>
          {/* <div className={style.info}></div> */}
          <div className={style.artist}>
            <span className={style['about-artist']}>About the artist</span>
            <div className={style.shadow}></div>
            <img className={style['artist-image']} src="https://i.scdn.co/image/ab6761610000e5ebc9d443fb5ced1dd32d106632" alt="Artist" />
            <div className={style['p-20']}>
              <span className={style.white}>RADWIMPS</span>
              <div className={`${style['between']} ${style['text-small']}`}>
                <span className={style.subtitle}>x.xxx.xxx monthly listeners</span>
                <span className={style['follow-btn']}>Follow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightTab