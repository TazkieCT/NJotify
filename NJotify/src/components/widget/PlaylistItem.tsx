import { useNavigate } from "react-router-dom";
import style from "../../styles/layoutPage/LeftTab.module.css";

const PlaylistItem = () => {
  const navigate = useNavigate();

  return (
    <div className={style.item} onClick={() => {navigate("/playlist");}}>
      <img className={style["album-cover"]} width={40} src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t1080x1080.jpg" alt=""/>
      <div className={style.col}>
        <span className={style["album-title"]}>My Playlist</span>
        <span className={style["album-subtitle"]}>Playlist • User</span>
      </div>
    </div>
  );
};

export default PlaylistItem;
