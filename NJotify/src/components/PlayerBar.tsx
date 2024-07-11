import style from '../styles/LayoutPage/PlayerBar.module.css'
import { TbArrowsDiagonal } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { BsFilePlay } from "react-icons/bs";
import { FiVolume2 } from "react-icons/fi";
import { FaBackwardStep } from "react-icons/fa6";
import { FaForwardStep } from "react-icons/fa6";
import { IoIosPause } from "react-icons/io";
import { FaPlay } from "react-icons/fa6";

// import { PiAirplay } from "react-icons/pi"; //Alternatif BsFilePlay
// import { PiAirplayFill } from "react-icons/pi";
// import { PiArrowsOutSimpleBold } from "react-icons/pi"; //Ketebalan

const PlayerBar = () => {
  return (
    <div className={`${style['container']} ${style['flex']}`}>
      <div className={style['player-info']}>
          <img className={style['album-cover']} width={60} src="https://upload.wikimedia.org/wikipedia/id/thumb/c/c2/Radwimps_Your_Name_Album_Cover.jpg/220px-Radwimps_Your_Name_Album_Cover.jpg" alt="" />
          <div className={style.col}>
            <span className={style['album-title']}>Sparkle - movie ver.</span>
            <span className={style['album-subtitle']}>RADWIMPS</span>
          </div>
      </div>
      <div className={style['music-control']}>
        <div className={`${style['flex']} ${style['center']}`}>
          <FaBackwardStep/>
          <span className={style['play-btn']}><FaPlay/></span>
          <FaForwardStep/>
        </div>
        <div className={`${style['flex']} ${style['center']}`}>
          <span>--:--</span>
          <input type="range" id="progress" name="progress" min="0" max="50"></input>
          <span>--:--</span>
        </div>
      </div>
      <div className={`${style['flex']} ${style['gap']}`}>
        <BsFilePlay/>
        <HiOutlineQueueList/>
        <FiVolume2/>
        <input type="range" id="vol" name="vol" min="0" max="50"></input>
        <TbArrowsDiagonal/>
      </div>
    </div>
  );
};

export default PlayerBar;
