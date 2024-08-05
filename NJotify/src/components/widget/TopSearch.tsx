import { useNavigate } from "react-router-dom";
import style from "../../styles/widget/TopSearch.module.css"

const TopSearch = ({ track } : {track:trackResult}) => {
  const navigate = useNavigate();

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className={`${style["flex-between"]} ${style["select"]}`} onClick={() => {navigate(`/track/${track.track_id}`)}}>
        <div className={style["song-info"]}>
            <img className={`${style["image-song"]}`} src={`http://localhost:8888/${track.track_image}`} alt=""/>
            <div className={style.col}>
                <span className={style["album-title"]}>{track.track_name}</span>
                <span className={style["album-subtitle"]}>{track.track_artist}</span>
            </div>
        </div>
        <span>
          {formatDuration(track.track_duration)}
        </span>
    </div>
  );
};

export default TopSearch;
