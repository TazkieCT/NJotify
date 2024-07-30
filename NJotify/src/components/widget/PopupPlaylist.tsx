import React from "react";
import style from "../../styles/widget/PopupClick.module.css";
import axios from "axios";

interface PopupClickAttributes {
  x: number;
  y: number;
  track_id: string;
  playlist_id: string;
  onClose: () => void;
  fetchTrack: () => void;
}

const PopupPlaylist: React.FC<PopupClickAttributes> = ({ x, y, track_id, playlist_id, onClose, fetchTrack }) => {
  const offsetX = -330;
  const offsetY = -35;

  const handleRemove = async (playlistId: string) => {
    const data = {
      playlist_id: playlistId,
      track_id: track_id,
    };

    try {
      const response = await axios.post("http://localhost:8888/remove-track-playlist", data);
      // console.log(response);
      fetchTrack();
      onClose();
    } catch (error) {
      console.error("Response error:", error);
    }
  };

  return (
    <div
      className={style["context-menu"]}
      style={{ top: y + offsetY, left: x + offsetX }}
    >
      {playlist_id && (
        <div className={style["context-menu-button"]} onClick={() => handleRemove(playlist_id)}>
          Remove from playlist
        </div>
      )}
      <div className={style["context-menu-button"]}>
        Save to your Liked Songs
      </div>
    </div>
  );
};

export default PopupPlaylist;
