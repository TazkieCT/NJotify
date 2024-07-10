import style from '../styles/LayoutPage/PlayerBar.module.css'
import { TbArrowsDiagonal } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { BsFilePlay } from "react-icons/bs";
import { FiVolume2 } from "react-icons/fi";

// import { PiAirplay } from "react-icons/pi"; //Alternatif BsFilePlay
// import { PiAirplayFill } from "react-icons/pi";
// import { PiArrowsOutSimpleBold } from "react-icons/pi"; //Ketebalan

const PlayerBar = () => {
  return (
    <div className={`${style['container']} ${style['flex']}`}>
      <div className={style['player-info']}>
          <img className={style['album-cover']} width={60} src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg" alt="" />
          <div className={style.col}>
            <span className={style['album-title']}>My Playlist</span>
            <span className={style['album-subtitle']}>Playlist • User</span>
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
