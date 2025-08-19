import axios from "axios";
import style from "../../styles/widget/RightBarContent.module.css"
import { FaMinus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

interface SongQueueProps {
  track?: trackInfo;
  onRemove?: () => void;
}

const SongQueue: React.FC<SongQueueProps> = ({ track, onRemove }) => {
  if (!track) {
    return null;
  }

  const [artist, setArtist] = useState<artistByTrack>();
  const [album, setAlbum] = useState<albumCard>();
  const navigate = useNavigate();

  const fetchAlbum = async () => {
    // console.log(trackId);
    try {
      const response = await axios.get(`${API_URL}/get-album-track/${track.track_id}`);
      setAlbum(response.data.data);
    } catch (error) {
      console.error("Error fetching album!", error);
    }
  };

  const fetchArtist = async () => {
    try {
      const response = await axios.get(`${API_URL}/artist-track/${track.track_id}`);
      setArtist(response.data.data);
      // console.log(artist);
    } catch (error) {
      console.error("Error fetching artist!", error);
    }
  };

  useEffect(() => {

    fetchArtist();

  }, [track.track_id]);

  useEffect(() => {

    fetchAlbum();

  }, [track.track_id]);

  return (
    <div className={style["song-info"]} onClick={() => {navigate(`/track/${track.track_id}`)}}>
      <img
        className={style["image-song"]}
        src={`${API_URL}/${album?.album_image}`}
        alt={track.track_name}
      />
      <div className={style.col}>
        <span className={style["album-title"]}>{track.track_name}</span>
        <span className={style["album-subtitle"]}>{artist?.artist_name}</span>
      </div>
      {onRemove && (
        <span
          className={style["remove-button"]}
          onClick={onRemove}
          aria-label={`Remove ${track.track_name}`}
        >
          <FaMinus/>
        </span>
      )}
    </div>
  );
};

export default SongQueue;
