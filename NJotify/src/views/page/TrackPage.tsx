import { FaPlay } from "react-icons/fa6"
import Footer from "../../components/layout/Footer"
import style from "../../styles/page/TrackPage.module.css"
import { RxDotsHorizontal } from "react-icons/rx"
import { BsPlusCircle } from "react-icons/bs";
import SongRow from "../../components/widget/SongRow";
import SongRowAlbum from "../../components/widget/SongRowAlbum";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { usePlayerStore } from "../../state/PlayerState";

const TrackPage = () => {
  const { trackId } = useParams<{ trackId: string }>();
  const [artist, setArtist] = useState<artistByTrack>();
  const [tracks, setTracks] = useState<trackArtist[]>([]);
  const [mainTrack, setMainTrack] = useState<trackArtist>();
  const [album, setAlbum] = useState<albumCard>();

  const fetchAlbum = async () => {
    // console.log(trackId);
    try {
      const response = await axios.get(`http://localhost:8888/get-album-track/${trackId}`);
      setAlbum(response.data.data);
    } catch (error) {
      console.error("Error fetching album!", error);
    }
  };

  const fetchArtist = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/artist-track/${trackId}`);
      setArtist(response.data.data);
      // console.log(artist);
    } catch (error) {
      console.error("Error fetching artist!", error);
    }
  };
  
  const fetchMainTrack = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/get-track-id/${trackId}`);
      setMainTrack(response.data.data);
      // console.log(response.data.data);
      // console.log(mainTrack);
    } catch (error) {
      console.error("Error fetching track!", error);
    }
  };
  
  const fetchTrack = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/get-track-artist/${artist?.artist_id}`);
      setTracks(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching track!", error);
    }
  };
  
  useEffect(() => {

    fetchArtist();

  }, [trackId]);

  useEffect(() => {

    // fetchArtist();
    fetchMainTrack();
    fetchAlbum();
    fetchTrack();

    // console.log(tracks);

  }, [artist]);

  
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

      await axios.get(`http://localhost:8888/add-queue/${mainTrack?.track_id}`);

      fetchQueue();
    } catch (error) {
      console.error("Error managing queue!", error);
    }
  };
  
  const transformToTrackAlbum = (track: trackArtist): trackAlbum => ({
    track_id: track.track_id,
    track_artist: artist?.artist_name || "Unknown Artist",
    track_name: track.track_name,
    track_album: track.track_album,
    track_file: track.track_file,
    track_image: track.track_image,
    track_duration: track.track_duration,
    track_count: track.track_count
  });

  const formatYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
          <div className={style['profile-avatar']}>
            <img src={`http://localhost:8888/${album?.album_image}`} className={style['profile-image']} alt="" />
          </div>
          <div className={style['profile-info']}>
            <span className={`${style.small}`}>Song</span>
            <span className={`${style.title} ${style['mb-2']}`}>{mainTrack?.track_name}</span>
            <span className={style.small}>{artist?.artist_name} · {mainTrack?.track_album} · {album?.album_time ? formatYear(album.album_time) : ''} · 2:52 · 57,419,073</span>
          </div>
        </div>
        <div className={`${style.section} ${style['gap-2']} ${style['flex-col']}`}>
            <div className={`${style.flex} ${style['gap-20']} ${style['pad-lu']}`}>
              <span className={style['play-btn']} onClick={addTracksToQueue}><FaPlay/></span>
              <span className={style.medium}><BsPlusCircle/></span>
              <span className={style.medium}><RxDotsHorizontal/></span>
            </div>
            <div className={`${style['pad-lu']} ${style['flex-col']} ${style['gap-2']}`}>
              <span className={`${style['small']} ${style['gray']}`}>Popular Tracks by</span>
              <span className={style.name}>{artist?.artist_name}</span>
              <div className="">
                {tracks && tracks.map((track, index) => (
                  <SongRow track={track} index={index + 1}/>
                ))}
              </div>
              <div>
                <span className={`${style['gray']} ${style['see-more']}`}>See more</span>
              </div>
            </div>
            <div className={`${style['pad-lu']} ${style['flex-col']}`}>
              <div className={style['player-info']}>
                <img className={style['album-cover']} src={`http://localhost:8888/${album?.album_image}`} alt="" />
                <div className={style.col}>
                  <span className={style['album-subtitle']}>From the {album?.album_type}</span>
                  <span className={style['album-title']}>{album?.album_name}</span>
                </div>
              </div>
              <div className={`${style['mt-sl']}`}>
                {mainTrack && <SongRowAlbum track={transformToTrackAlbum(mainTrack)} index={1} />}
              </div>
            </div>
            <div className={`${style['pad-lu']} ${style['flex-col']}`}>
              <span className={style['license']}>March 6, 2024</span>
              <span className={style['license']}>&copy; 2024 Vingolf Recordings under exclusive license to AWAL Recordings America, Inc.</span>
              <span className={style['license']}>&copy; 2024 Vingolf Recordings under exclusive license to AWAL Recordings America, Inc.</span>
            </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default TrackPage