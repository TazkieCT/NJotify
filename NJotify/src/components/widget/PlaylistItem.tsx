import { useNavigate } from "react-router-dom";
import style from "../../styles/layoutPage/LeftTab.module.css";
import { API_URL } from "../../config/api";

const PlaylistItem = ({ playlist } : { playlist: playlist }) => {
  const navigate = useNavigate();

  return (
    <div className={style.item} onClick={() => {navigate(`/playlist/${playlist.playlist_id}`);}}>
      <img className={style["album-cover"]} width={40} src={`${API_URL}/${playlist?.playlist_image}`} alt=""/>
      <div className={style.col}>
        <span className={style["album-title"]}>{playlist.playlist_name}</span>
        <span className={style["album-subtitle"]}>Playlist · {playlist.playlist_user}</span>
      </div>
    </div>
  );
};

export default PlaylistItem;
