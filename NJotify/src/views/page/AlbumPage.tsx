import { FaPlay } from "react-icons/fa6";
import Footer from "../../components/layout/Footer";
import style from "../../styles/page/TrackPage.module.css";
import { RxDotsHorizontal } from "react-icons/rx";
import { BsPlusCircle } from "react-icons/bs";
import SongRowAlbum from "../../components/widget/SongRowAlbum";
import { LuList } from "react-icons/lu";
import { LuClock3 } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DiscographyCard from "../../components/widget/DiscographyCard";
import { usePlayerStore } from "../../state/PlayerState";
import { API_URL } from "../../config/api";

const AlbumPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [albums, setAlbums] = useState<albumCard>();
  const [others, setOthers] = useState<albumCard[]>([]);
  const [tracks, setTracks] = useState<trackAlbum[]>([]);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-album/${albumId}`);
        setAlbums(response.data.data);
      } catch (error) {
        console.error("Error fetching album!", error);
      }
    };

    const fetchTrack = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-track-album/${albumId}`);
        setTracks(response.data.data);
      } catch (error) {
        console.error("Error fetching track!", error);
      }
    };

    const fetchOtherAlbum = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-album-other/${albumId}`);
        setOthers(response.data.data);
      } catch (error) {
        console.error("Error fetching album!", error);
      }
    };

    fetchOtherAlbum();
    fetchAlbum();
    fetchTrack();
  }, [albumId]);

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

      for (const track of tracks) {
        await axios.get(`${API_URL}/add-queue/${track.track_id}`);
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
            <img src={`${API_URL}/${albums?.album_image}`} className={style['profile-image']} alt="" />
          </div>
          <div className={style['profile-info']}>
            <span className={`${style.small}`}>{albums?.album_type}</span>
            <span className={`${style.title} ${style['mb-2']}`}>{albums?.album_name}</span>
            <span className={style.small}>{albums?.album_artist} · 2020 · {tracks?.length} Songs · 25 min 7 sec</span>
          </div>
        </div>
        <div className={`${style.section} ${style['gap-2']} ${style['flex-col']}`}>
            <div className={`${style['pad-lu']}`}>
                <div className={`${style['flex-between']}`}>
                    <div className={`${style['flex']} ${style['gap-20']}`}>
                        <span className={style['play-btn']} onClick={addTracksToQueue}><FaPlay/></span>
                        <span className={style.medium}><BsPlusCircle/></span>
                        <span className={style.medium}><RxDotsHorizontal/></span>
                    </div>
                    <div className={style['menu-item']}>List <span className={style['box-icon']}><LuList/></span></div>
                </div>
            </div>
            <div className={`${style['pad-lu']} ${style['flex-col']}`}>
              <div className={style["song-row"]}>
                <div className={style["song-number-album"]}>#</div>
                <div className={style["song-name-album"]}>
                  <div className={style.artist}>Title</div>
                </div>
                <div className={style["song-duration-album"]}><LuClock3/></div>
              </div>
              <hr className={`${style.hr} ${style['mb-2']}`}/>
              {tracks && tracks.map((track, index) => (
              <SongRowAlbum key={track.track_id} track={track} index={index + 1} />
              ))}
            </div>
            <div className={`${style['pad-lu']}`}>
              <div className={`${style['flex-between']}`}> 
                <div className={`${style['flex-col']}`}>
                  <span className={style['license']}>March 6, 2024</span>
                  <span className={style['license']}>&copy; 2024 Vingolf Recordings under exclusive license to AWAL Recordings America, Inc.</span>
                  <span className={style['license']}>&copy; 2024 Vingolf Recordings under exclusive license to AWAL Recordings America, Inc.</span>
                </div>
              </div>
            </div>
            <div className={`${style['pad-lu']} ${style['flex-col']}`}>
                <div className={`${style['flex-between']}`}>
                    <span className={style.name}>More by {albums?.album_artist}</span>
                    <span className={`${style['gray']} ${style['see-more']}`}>See discography</span>
                </div>
              <div className={`${style['flex-ril']} `}>
                {others && others.map(other => (
                  <DiscographyCard key={other.album_id} album={other} />
                ))}
              </div>
            </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default AlbumPage;
