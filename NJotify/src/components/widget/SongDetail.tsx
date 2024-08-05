import { IoCloseOutline } from "react-icons/io5";
import { RxDotsHorizontal } from "react-icons/rx";
import style from "../../styles/widget/RightBarContent.module.css";
import useRightTabStore from "../../state/RightBarState";
import { usePlayerStore } from "../../state/PlayerState";
import axios from "axios";
import { useEffect, useState } from "react";
import NextQueue from "./NextQueue";

const SongDetail = () => {
  const { closeRightTab } = useRightTabStore();
  const { currentTrack, queue } = usePlayerStore();
  const [artist, setArtist] = useState<artistByTrack>();
  const [album, setAlbum] = useState<albumCard>();

  const fetchAlbum = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/get-album-track/${currentTrack?.track_id}`);
      setAlbum(response.data.data);
    } catch (error) {
      console.error("Error fetching album!", error);
    }
  };

  const fetchArtist = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/artist-track/${currentTrack?.track_id}`);
      setArtist(response.data.data);
    } catch (error) {
      console.error("Error fetching artist!", error);
    }
  };

  const fetchArtistProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/get-user/${artist?.artist_id}`);
      setArtist(response.data.data);
    } catch (error) {
      console.error("Error fetching artist!", error);
    }
  };

  useEffect(() => {
    fetchArtist();
  }, [currentTrack?.track_id]);

  useEffect(() => {
    fetchAlbum();
  }, [currentTrack?.track_id]);

  useEffect(() => {
    fetchArtistProfile();
  }, [artist?.artist_id]);

  // Find the index of the current track in the queue
  const currentTrackIndex = queue.findIndex(track => track.track_id === currentTrack?.track_id);
  // Get the next track if available
  const nextTrack = currentTrackIndex >= 0 && currentTrackIndex < queue.length - 1
    ? queue[currentTrackIndex + 1]
    : null;

  const { changeContent } = useRightTabStore();
  const setContent = () => {
    changeContent("queue");
  };

  return (
    <>
      <div className={`${style['flex-between']} ${style['sticky']}`}>
        <a className={style['header-text']}>Artist</a>
        <a className={style['header-button']}>
          <span className={style.medium}><RxDotsHorizontal/></span>
          <span className={style.medium} onClick={closeRightTab}><IoCloseOutline/></span>
        </a>
      </div>
      <div className={style.content}>
        <div className={style.album}>
          <img className={style['album-cover']} src={`http://localhost:8888/${album?.album_image}`} alt="" />
          <span className={style.title}>{currentTrack?.track_name}</span>
          <span className={style.subtitle}>{artist?.artist_name}</span>
        </div>
        <div className={style.artist}>
          <span className={style['about-artist']}>About the artist</span>
          <div className={style.shadow}></div>
          <img className={style['artist-image']} src={`http://localhost:8888/${artist?.banner_image}`} alt="Artist" />
          <div className={style['p-20']}>
            <span className={style.white}>{artist?.artist_name}</span>
            <div className={`${style['between']} ${style['text-small']}`}>
              <span className={style.subtitle}>0 monthly listeners</span>
              <span className={style['follow-btn']}>Follow</span>
            </div>
          </div>
        </div>
        <div className={`${style['next-queue']} ${style['p-20']}`}>
          <div className={`${style['between']} ${style['text-small']}`}>
            <span className={`${style['white']} ${style['text-small']}`}>Next in queue</span>
            <span className={`${style['link']} ${style['text-small']}`} onClick={setContent}>Open queue</span>
          </div>
          {nextTrack ? (
            <NextQueue track={nextTrack} artistName={artist?.artist_name} />
          ) : (
            <span className={style['no-next-track']}>No more tracks in queue</span>
          )}
        </div>
      </div>
    </>
  );
};

export default SongDetail;
