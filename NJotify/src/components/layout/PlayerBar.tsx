import React, { useEffect, useRef, useState } from 'react';
import style from '../../styles/layoutPage/PlayerBar.module.css';
import { TbArrowsDiagonal } from "react-icons/tb";
import { HiOutlineQueueList } from "react-icons/hi2";
import { BsFilePlay } from "react-icons/bs";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { FaBackwardStep, FaForwardStep, FaPlay, FaPause } from "react-icons/fa6";
import useRightTabStore from '../../state/RightBarState';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../../state/PlayerState';
import axios from 'axios';

const PlayerBar = () => {
  const navigate = useNavigate();
  const { content, isOpen, changeContent, openRightTab, closeRightTab } = useRightTabStore();
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentTrack, skipToNextTrack, skipToPreviousTrack, isAdPlaying, setAdPlaying } = usePlayerStore();
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

  useEffect(() => {
    fetchArtist();
  }, [currentTrack?.track_id]);

  useEffect(() => {
    fetchAlbum();
  }, [currentTrack?.track_id]);

  const handleClickRightBar = (contents: string) => {
    changeContent(contents);
    if (!isOpen) {
      openRightTab();
    }
    if (isOpen && contents === content) {
      closeRightTab();
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProgress(Number(value));

    if (audioRef.current) {
      const duration = audioRef.current.duration;
      audioRef.current.currentTime = (Number(value) / 100) * duration;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVolume(Number(value));
    e.target.style.setProperty('--volume', `${value}%`);

    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : Number(value) / 100;
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
    if (audioRef.current) {
      audioRef.current.volume = muted ? volume / 100 : 0;
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.play();
      setPlaying(true);
      if (currentTrack.track_id === 'ad') {
        setAdPlaying(true); // Set ad status
      } else {
        setAdPlaying(false);
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, [currentTrack]);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const duration = audioRef.current.duration;
        const currentTime = audioRef.current.currentTime;
        const progressValue = (currentTime / duration) * 100;
        setProgress(progressValue);
        
        if (audioRef.current.parentElement) {
          audioRef.current.parentElement.style.setProperty('--progress', `${progressValue}%`);
        }
      }
    };

    audioRef.current?.addEventListener('timeupdate', updateProgress);
    audioRef.current?.addEventListener('ended', () => {
      skipToNextTrack();
      setAdPlaying(false); // Reset ad status when the track ends
    });
    
    return () => {
      audioRef.current?.removeEventListener('timeupdate', updateProgress);
      audioRef.current?.removeEventListener('ended', () => {
        skipToNextTrack();
        setAdPlaying(false);
      });
    };
  }, []);

  return (
    <div className={`${style['container']} ${style['flex']}`}>
      <div className={style['player-info']}>
        <img className={style['album-cover']} width={60} src={`http://localhost:8888/${album?.album_image}`} alt="" />
        <div className={style.col}>
          <span className={style['album-title']}>{currentTrack?.track_name}</span>
          <span className={style['album-subtitle']} onClick={() => { navigate(`/artist/${artist?.artist_id}`) }}>{`${artist?.artist_name}`}</span>
        </div>
      </div>
      <div className={style['music-control']}>
        <div className={`${style['flex']} ${style['center']}`}>
          <span onClick={skipToPreviousTrack} style={{ pointerEvents: isAdPlaying ? 'none' : 'auto' }}>
            <FaBackwardStep />
          </span>
          <span className={style['play-btn']} onClick={togglePlay}>
            {playing ? <FaPause /> : <FaPlay />}
          </span>
          <span onClick={skipToNextTrack} style={{ pointerEvents: isAdPlaying ? 'none' : 'auto' }}>
            <FaForwardStep />
          </span>
        </div>
        <div className={`${style['flex']} ${style['center']}`}>
          <span className={`${style['small']} ${style['width-1']}`}>{formatTime((progress / 100) * (audioRef.current?.duration ?? 0))}</span>
          <input type="range" id="progress" name="progress" className={style['play']} min="0" max="100" value={progress} onChange={handleProgressChange} />
          <span className={`${style['small']} ${style['width-1']}`}>{formatTime(audioRef.current?.duration ?? 0)}</span>
          <audio preload='metadata' ref={audioRef} src={`http://localhost:8888/${currentTrack?.track_file}`} />
        </div>
      </div>
      <div className={`${style['flex']} ${style['player-setting']} ${style['gap']}`}>
        <span onClick={() => handleClickRightBar('song-detail')} className={`${style['flex-center']} ${style.icon}`}>
          <BsFilePlay />
        </span>
        <span onClick={() => handleClickRightBar('queue')} className={`${style['flex-center']} ${style['big-icon']} ${style.icon}`}>
          <HiOutlineQueueList />
        </span>
        <span className={`${style['flex-center']} ${style['gap-2']}  ${style['md-icon']} `}>
          <span className={`${style.icon} ${style['flex']}`} onClick={toggleMute}>
            {muted ? <FiVolumeX /> : <FiVolume2 />}
          </span>
          <input type="range" id="vol" name="vol" className={style['volume']} min="0" max="100" value={volume} onChange={handleVolumeChange} />
        </span>
        <span className={`${style['flex-center']} ${style.icon}`}>
          <TbArrowsDiagonal />
        </span>
      </div>
    </div>
  );
};

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds < 0) return '--:--';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
};

export default PlayerBar;
