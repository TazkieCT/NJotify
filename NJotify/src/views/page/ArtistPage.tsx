import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import style from "../../styles/page/ArtistPage.module.css";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa6";
import { RxDotsHorizontal } from "react-icons/rx";
import SongRow from "../../components/widget/SongRow";
import Footer from "../../components/layout/Footer";
import DiscographyCard from "../../components/widget/DiscographyCard";
import PlaylistCard from "../../components/widget/PlaylistCard";
import { usePlayerStore } from "../../state/PlayerState";

const ArtistPage = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [artist, setArtist] = useState<artist>();
  const [albums, setAlbums] = useState<albumCard[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<albumCard[]>([]);
  const [tracks, setTracks] = useState<trackArtist[]>([]);
  const [activeButton, setActiveButton] = useState<string>("Popular release");
  const [playlists, setPlaylists] = useState<playlist[]>([]);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/artist/${artistId}`);
        setArtist(response.data.data);
      } catch (error) {
        console.error("Error fetching artist!", error);
      }
    };

    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/get-album-artist/${artistId}`);
        setAlbums(response.data.data);
        setFilteredAlbums(response.data.data);
      } catch (error) {
        console.error("Error fetching album!", error);
      }
    };

    const fetchTrack = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/get-track-artist/${artistId}`);
        setTracks(response.data.data);
      } catch (error) {
        console.error("Error fetching track!", error);
      }
    };

    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/get-playlist-artist/${artistId}`);
        setPlaylists(response.data.data);
      } catch (error) {
        console.error("Error fetching playlist!", error);
      }
    };

    fetchAlbum();
    fetchArtist();
    fetchTrack();
    fetchPlaylist();
  }, [artistId]);

  const bannerImageUrl = artist?.banner_image
    ? `http://localhost:8888/${artist.banner_image.replace(/\\/g, '/')}`
    : '';

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  useEffect(() => {
    if (activeButton === "Popular release") {
      setFilteredAlbums(albums);
    } else if (activeButton === "Singles and EPs"){
      setFilteredAlbums(albums.filter(album => album.album_type === "Single" || album.album_type === "Eps"));
    } else {
      setFilteredAlbums(albums.filter(album => album.album_type === "Album"));
    }
  }, [activeButton, albums]);

  const topTracks = tracks
    .sort((a, b) => b.track_count - a.track_count)
    .slice(0, 5);

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

  const shuffleArray = (array: trackArtist[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  };
  
  const addTracksToQueue = async () => {
    try {
      await axios.get(`http://localhost:8888/reset-queue`);
      clearQueue();
  
      const shuffledTracks = shuffleArray([...tracks]);
  
      for (const track of shuffledTracks) {
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
        <div className={`${style['header']} ${style['gap-2']}`} style={{ backgroundImage: `url(${bannerImageUrl})` }}>
          <div className={`${style['flex']} ${style['gap-2']}`}>
            <span className={style['verif-icon']}><VscVerifiedFilled /></span> Verified Artist
          </div>
          <span className={style.title}>{artist?.artist_name}</span>
          <span>1,778,185 monthly listeners</span>
        </div>
        <div className={`${style['pad-content']} ${style['flex-column']} ${style['gap-3']}`}>
          <div className={`${style.flex} ${style['gap-20']} ${style['pad-up']}`}>
          <span className={style['play-btn']} onClick={addTracksToQueue}><FaPlay/></span>
            <span className={style['follow-btn']}>Follow</span>
            <span className={style.medium}><RxDotsHorizontal/></span>
          </div>
          <div className={`${style['flex-column']} ${style['gap-3']}`}>
            <span className={style['title-content']}>Popular</span>
            <div className={style['song-list']}>
              {topTracks && topTracks.map((track, index) => (
                <SongRow key={track.track_id} track={track} index={index + 1}/>
              ))}
            </div>
          </div>
          <div className={`${style['flex-column']} ${style['gap-3']}`}>
            <span className={style['title-content']}>Discography</span>
            <div className={`${style['flex']} ${style['gap-sl']}`}>
                <button key={"Popular release"} className={` ${activeButton === "Popular release" ? style['active'] : style['type-button']}`} onClick={() => handleButtonClick("Popular release")}>
                  Popular release
                </button>
                <button key={"Albums"} className={` ${activeButton === "Albums" ? style['active'] : style['type-button']}`} onClick={() => handleButtonClick("Albums")}>
                  Albums
                </button>
                <button key={"Singles and EPs"} className={` ${activeButton === "Singles and EPs" ? style['active'] : style['type-button']}`} onClick={() => handleButtonClick("Singles and EPs")}>
                  Singles and EPs
                </button>
            </div>
            <div className={`${style['flex-block']} ${style['gap-3']} ${style['pad-col']}`}>
              {filteredAlbums && filteredAlbums.map(album => (
                <DiscographyCard key={album.album_id} album={album} />
              ))}
            </div>
          </div>
          <div className={`${style['flex-column']} ${style['gap-3']}`}>
            <span className={style['title-content']}>Featuring {artist?.artist_name}</span>
            <div className={`${style['flex-block']} ${style['gap-3']} ${style['pad-col']}`}>
              {playlists && playlists.map(playlists => (
                <PlaylistCard key={playlists.playlist_id} playlist={playlists}/>
              ))}
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default ArtistPage;
