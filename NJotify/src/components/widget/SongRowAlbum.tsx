import { useEffect, useRef, useState } from "react";
import style from "../../styles/widget/SongRow.module.css"
import PopupClick from "./PopupClick";

const SongRowAlbum = ({ track, index } : { track: trackAlbum, index: number }) => {
  const [popUp, setPopUp] = useState<{ visible: boolean, x: number, y: number }>({ visible: false, x: 0, y: 0 });
  const songRowRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className={style["song-row"]} onContextMenu={handlePopUpMenu} ref={songRowRef}>
      <div className={style["song-number-album"]}>{index}</div>
      <div className={style["song-name-album"]}>
        <div className={style.name}>{track.song_name}</div>
        <div className={style.artist}>{track.song_artist}</div>
      </div>
      <div className={style["song-duration-album"]}>1:47</div>
      {popUp.visible && (
        <PopupClick x={popUp.x} song_id={track.song_id} y={popUp.y} onClose={handleClosePopUpMenu} />
      )}
    </div>
  );
};

export default SongRowAlbum;
