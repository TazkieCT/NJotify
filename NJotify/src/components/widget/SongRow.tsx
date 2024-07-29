import React, { useState } from "react";
import style from "../../styles/widget/SongRow.module.css";
import PopupClick from "./PopupClick";

const SongRow = () => {
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  return (
    <>
      <div className={style["song-row"]} onContextMenu={handleContextMenu}>
        <div className={style["song-number"]}>1</div>
        <div className={style["song-image"]}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_OYDA4kKvYjecstExcHZ59U9odQMFVNO4XA&s"
            alt=""
          />
        </div>
        <div className={style["song-name"]}>Kuaminkan dengan lantang</div>
        <div className={style["song-popularity"]}>345.167</div>
        <div className={style["song-duration"]}>1:47</div>
      </div>
      {/* {contextMenu.visible && (
        <PopupClick x={contextMenu.x + 400} y={contextMenu.y} onClose={handleCloseContextMenu} />
      )} */}
    </>
  );
};

export default SongRow;
