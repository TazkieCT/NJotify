import React, { useState, useEffect, useRef } from "react";
import style from "../../styles/widget/SongRow.module.css";
import PopupClick from "./PopupClick";

const SongRowPlaylist: React.FC = () => {
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
    <>
      <div className={style["song-row"]} onContextMenu={handlePopUpMenu} ref={songRowRef}>
        <div className={style["song-number-playlist"]}>1</div>
        <div className={`${style["song-name-playlist"]} ${style["flex"]}`}>
          <div className={style["image-playlist"]}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_OYDA4kKvYjecstExcHZ59U9odQMFVNO4XA&s"
              alt=""
            />
          </div>
          <div className="">
            <div className={style.name}>APOLOGY</div>
            <div className={style.artist}>XIO</div>
          </div>
        </div>
        <div className={style["song-album-playlist"]}>as long as you're okay</div>
        <div className={style["song-date-playlist"]}>Jul 25, 2024</div>
        <div className={style["song-duration-playlist"]}>1:47</div>
      </div>
      {/* {popUp.visible && (
        <PopupClick x={popUp.x} y={popUp.y} onClose={handleClosePopUpMenu} />
      )} */}
    </>
  );
};

export default SongRowPlaylist;
