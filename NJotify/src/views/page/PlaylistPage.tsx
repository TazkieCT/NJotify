import { FaPlay } from "react-icons/fa6";
import Footer from "../../components/layout/Footer";
import style from "../../styles/page/TrackPage.module.css";
import { RxDotsHorizontal } from "react-icons/rx";
import { BsPlusCircle } from "react-icons/bs";
import { LuList } from "react-icons/lu";
import { LuClock3 } from "react-icons/lu";
import SongRowPlaylist from "../../components/widget/SongRowPlaylist";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalDelete from "../../components/widget/ModalDelete";
import useCookie from "../../state/CookieState";
import { usePlayerStore } from "../../state/PlayerState";

const PlaylistPage = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const [playlist, setPlaylist] = useState<playlist>();
  const [tracks, setTracks] = useState<trackPlaylist[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { cookie } = useCookie();

  const fetchPlaylist = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/get-playlist-id/${playlistId}`, {
        headers: {
          Authorization: `${cookie}`
        }
      });
      setPlaylist(response.data.data);
    } catch (error) {
      console.error("Error fetching playlist!", error);
    }
  };

  const fetchTrack = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/get-track-playlist/${playlistId}`, {
        headers: {
          Authorization: `${cookie}`
        }
      });
      setTracks(response.data.data);
      // console.log(response.data.data)
    } catch (error) {
      console.error("Error fetching track!", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/delete-playlist/${playlistId}`, {
        headers: {
          Authorization: `${cookie}`
        }
      });
      console.log(response)
      navigate("/home")
    } catch (error) {
      if (error) {
        console.error("Response error:", error);
      }
    }
  };

  useEffect(() => {
    fetchPlaylist();
    fetchTrack();    
  }, [playlistId]);

  const { setQueue, clearQueue, setCurrentTrack } = usePlayerStore();

  const fetchQueue = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/get-queue`);
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
      await axios.get(`http://localhost:8888/reset-queue`);
      clearQueue();

      for (const track of tracks) {
        await axios.get(`http://localhost:8888/add-queue/${track.track_id}`);
      }

      fetchQueue();
    } catch (error) {
      console.error("Error managing queue!", error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
          <div className={style['profile-avatar']}>
            <img src={`http://localhost:8888/${playlist?.playlist_image}`} className={style['profile-image']} alt="" />
          </div>
          <div className={style['profile-info']}>
            <span className={`${style.small}`}>Playlist</span>
            <span className={`${style.title}`}>{playlist?.playlist_name}</span>
            <span className={`${style.small} ${style.gray} ${style['hdesc-2']}`}>{playlist?.playlist_desc}</span>
            <span className={style.small}>{playlist?.playlist_user} · 19,131 likes · 5 Songs · 25 min 7 sec</span>
          </div>
        </div>
        <div className={`${style.section} ${style['gap-2']} ${style['flex-col']}`}>
          <div className={`${style['pad-lu']}`}>
            <div className={`${style['flex-between']}`}>
              <div className={`${style['flex']} ${style['gap-20']}`}>
                <span className={style['play-btn']} onClick={addTracksToQueue}><FaPlay/></span>
                <span className={style.medium}><BsPlusCircle /></span>
                <span className={style.medium} onClick={() => setIsModalOpen(true)}><RxDotsHorizontal /></span>
              </div>
              <div className={style['menu-item']}>List <span><LuList /></span></div>
            </div>
          </div>
          <div className={`${style['pad-lu']} ${style['flex-col']}`}>
            <div className={style["song-row"]}>
              <div className={style["song-number-playlist"]}>#</div>
              <div className={style["song-name-playlist"]}>
                <div className={style.artist}>Title</div>
              </div>
              <div className={style["song-album-playlist"]}>Album</div>
              <div className={style["song-date-playlist"]}>Date added</div>
              <div className={style["song-duration-playlist"]}><LuClock3 /></div>
            </div>
            <hr className={`${style.hr} ${style['mb-2']}`} />
            {tracks && tracks.map((track, index) => (
              <SongRowPlaylist key={track.track_id} playlist_id={playlist?.playlist_id} track={track} index={index + 1} fetchTrack={fetchTrack} />
            ))}
            {!tracks && (
              <div className={style['no-track']}>No tracks in this playlist</div>
            )}
          </div>
        </div>
        <Footer />
      </div>
      <ModalDelete
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSave={handleDelete}
      />
    </div>
  )
}

export default PlaylistPage;
