import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/widget/SongRow.module.css";
import PopupClick from "./PopupClick";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const SongRow = ({ track, index } : { track: trackArtist, index: number }) => {
  const navigate = useNavigate();
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const songRowRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (songRowRef.current && !songRowRef.current.contains(event.target as Node)) {
        handleCloseContextMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const trackImageUrl = track?.track_image
    ? `http://localhost:8888/${track.track_image.replace(/\\/g, '/')}`
    : '';

  const trackPage = () => {
    navigate(`/track/${track.track_id}`)
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className={style["song-row"]} onContextMenu={handleContextMenu} ref={songRowRef}>
        <div className={style["song-number"]}>
          <span className={style['index']}>{index}</span>
          {/* onClick={togglePlay} */}
          <span className={style['play']}><FaPlay/></span>
        </div>
        <div className={style["song-image"]}>
          <img
            src={trackImageUrl}
            alt=""
          />
        </div>
        <div className={style["song-name"]} onClick={trackPage}>{track.track_name}</div>
        <div className={style["song-popularity"]}>{track.track_count}</div>
        <div className={style["song-duration"]}>{formatDuration(track.track_duration)}</div>
      </div>
      {contextMenu.visible && (
        <PopupClick x={contextMenu.x} y={contextMenu.y} track_id={track?.track_id} onClose={handleCloseContextMenu} />
      )}
    </>
  );
};

export default SongRow;
