import style from "../../styles/widget/PopupClick.module.css";
import axios from "axios";
import { usePlayerStore } from "../../state/PlayerState";
import { API_URL } from "../../config/api";

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
  const { setQueue, setCurrentTrack } = usePlayerStore();

  const handleRemove = async (playlistId: string) => {
    const data = {
      playlist_id: playlistId,
      track_id: track_id,
    };

    try {
      await axios.post(`${API_URL}/remove-track-playlist`, data);
      // console.log(response);
      fetchTrack();
      onClose();
    } catch (error) {
      console.error("Response error:", error);
    }
  };

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

  const addQueue = async () => {
    try {
      await axios.get(`${API_URL}/add-queue/${track_id}`);
      fetchQueue();
    } catch (error) {
      console.error("Error fetching playlist!", error);
    }
  };

  return (
    <div
      className={style["context-menu"]}
      style={{ top: y + offsetY, left: x + offsetX }}
    >
      {playlist_id && (
        <>
          <div className={style["context-menu-button"]} onClick={() => handleRemove(playlist_id)}>
            Remove from playlist
          </div>
          <div className={style["context-menu-queue"]} onClick={addQueue}>
            Add to queue
          </div>
        </>
      )}
      <div className={style["context-menu-button"]}>
        Save to your Liked Songs
      </div>
    </div>
  );
};

export default PopupPlaylist;
