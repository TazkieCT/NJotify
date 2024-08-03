import { useEffect, useRef, useState } from "react";
import style from "../../styles/widget/SongRow.module.css"
import PopupClick from "./PopupClick";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { usePlayerStore } from "../../state/PlayerState";

const SongRowAlbum = ({ track, index } : { track: trackAlbum, index: number }) => {
  const [popUp, setPopUp] = useState<{ visible: boolean, x: number, y: number }>({ visible: false, x: 0, y: 0 });
  const songRowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { setCurrentTrack } = usePlayerStore();

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

  const togglePlay = () => {
    if (track) {
      const trackToPlay: Track = {
        track_id: track.track_id,
        track_artist: "",
        track_name: track.track_name,
        track_file: track.track_file,
        track_image: track.track_image,
      };
      setCurrentTrack(trackToPlay);
    }
  };

  return (
    <div className={style["song-row"]} onContextMenu={handlePopUpMenu} ref={songRowRef}>
      <div className={style["song-number-album"]}>
        <span className={style['index']}>{index}</span>
        <span className={style['play']} onClick={togglePlay}><FaPlay/></span>
      </div>
      <div className={style["song-name-album"]}>
        <div className={style.name} onClick={() => {navigate(`/track/${track.track_id}`)}}>{track.track_name}</div>
        <div className={style.artist}>{track.track_artist}</div>
      </div>
      <div className={style["song-duration-album"]}>1:47</div>
      {popUp.visible && (
        <PopupClick x={popUp.x} track_id={track.track_id} y={popUp.y} onClose={handleClosePopUpMenu} />
      )}
    </div>
  );
};

export default SongRowAlbum;
