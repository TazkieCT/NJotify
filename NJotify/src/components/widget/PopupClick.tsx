import React, { useEffect, useState } from "react";
import style from "../../styles/widget/PopupClick.module.css";
import useUserStore from "../../state/AccountState";
import axios from "axios";

interface Playlist {
  playlist_id: string;
  playlist_name: string;
}

interface PopupClickAttributes {
  x: number;
  y: number;
  track_id: string;
  onClose: () => void;
}

const PopupClick: React.FC<PopupClickAttributes> = ({ x, y, track_id }) => {
  const offsetX = -330;
  const offsetY = -35;
  const { user } = useUserStore();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const fetchPlaylist = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/get-playlist-user/${user.Id}`);
      setPlaylists(response.data.data);
    } catch (error) {
      console.error("Error fetching playlist!", error);
    }
  };

  const handleAdd = async (playlistId: string) => {
    const data = {
      playlist_id: playlistId,
      track_id: track_id,
    };
  
    try {
      const response = await axios.post("http://localhost:8888/add-track-playlist", data);
      console.log(response);
    } catch (error) {
      console.error("Response error:", error);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [user.Id]);

  return (
    <div
      className={style["context-menu"]}
      style={{ top: y + offsetY, left: x + offsetX }}
    >
      <div className={style["context-menu-button"]}>
        Add to playlist
      </div>
      {playlists && (
        <div className={style["dropdown-menu"]}>
          <ul>
            {playlists.map(playlist => (
              <li key={playlist.playlist_id} onClick={() => handleAdd(playlist.playlist_id)}>
                {playlist.playlist_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PopupClick;
