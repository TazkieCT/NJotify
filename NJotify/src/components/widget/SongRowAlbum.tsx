import { useEffect, useRef, useState } from "react";
import style from "../../styles/widget/SongRow.module.css"
import PopupClick from "./PopupClick";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import axios from "axios";
import { usePlayerStore } from "../../state/PlayerState";
import { API_URL } from "../../config/api";

const SongRowAlbum = ({ track, index } : { track: trackAlbum, index: number }) => {
  const [popUp, setPopUp] = useState<{ visible: boolean, x: number, y: number }>({ visible: false, x: 0, y: 0 });
  const songRowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handlePopUpMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setPopUp({
      visible: true,
      x: event.pageX,
      y: event.pageY,
    });
  };

  const handleClosePopUpMenu = () => {
    setPopUp({ visible: false, x: 0, y: 0 });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (songRowRef.current && !songRowRef.current.contains(event.target as Node)) {
        handleClosePopUpMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const { setQueue, clearQueue, setCurrentTrack } = usePlayerStore();

  const fetchQueue = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-queue`);
      const fetchedQueue = response.data.data;
      setQueue(fetchedQueue);
      if (fetchedQueue.length > 0) {
        setCurrentTrack(fetchedQueue[0]);
      }
    } catch (error) {
      console.error("Error fetching playlist!", error);
    }
  };

  const addTracksToQueue = async () => {
    try {
      await axios.get(`${API_URL}/reset-queue`);
      clearQueue();

      await axios.get(`${API_URL}/add-queue/${track.track_id}`);

      fetchQueue();
    } catch (error) {
      console.error("Error managing queue!", error);
    }
  };

  return (
    <div className={style["song-row"]} onContextMenu={handlePopUpMenu} ref={songRowRef}>
      <div className={style["song-number-album"]}>
        <span className={style['index']}>{index}</span>
        <span className={style['play']} onClick={addTracksToQueue}><FaPlay/></span>
      </div>
      <div className={style["song-name-album"]}>
        <div className={style.name} onClick={() => {navigate(`/track/${track.track_id}`)}}>{track.track_name}</div>
        <div className={style.artist}>{track.track_artist}</div>
      </div>
      <div className={style["song-duration-album"]}>{formatDuration(track.track_duration)}</div>
      {popUp.visible && (
        <PopupClick x={popUp.x} track_id={track.track_id} y={popUp.y} onClose={handleClosePopUpMenu} />
      )}
    </div>
  );
};

export default SongRowAlbum;
