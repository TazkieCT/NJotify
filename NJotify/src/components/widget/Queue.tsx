import React from 'react';
import { IoCloseOutline } from "react-icons/io5";
import style from "../../styles/widget/RightBarContent.module.css";
import useRightTabStore from "../../state/RightBarState";
import SongQueue from "./SongQueue";
import axios from "axios";
import { usePlayerStore } from "../../state/PlayerState";
import { FiTrash2 } from "react-icons/fi";

const Queue: React.FC = () => {
  const { closeRightTab } = useRightTabStore();
  const { currentTrack, queue, removeTrackFromQueue, clearQueue } = usePlayerStore();
  const currentTrackIndex = queue.findIndex(track => track.track_id === currentTrack?.track_id);
  const startIndex = currentTrackIndex + 1;

  const handleRemoveTrack = async (trackId: string) => {
    try {
      await axios.get(`http://localhost:8888/remove-queue/${trackId}`);
      // console.log(response);
    } catch (error) {
      console.error("Response error:", error);
    }
    removeTrackFromQueue(trackId);
  };

  const handleClearQueue = async () => {
    await axios.get(`http://localhost:8888/reset-queue`);
    clearQueue();
  };

  return (
    <>
      <div className={`${style['flex-between']} ${style['sticky']}`}>
        <a className={style['header-text']}>Queue</a>
        <a className={style['header-button']}>
          <span className={style.medium} onClick={closeRightTab}><IoCloseOutline /></span>
        </a>
      </div>
      <div className={style['content-queue']}>
        <div className={style['padding-20']}>
          <div className={style.gap}>
            <div className={`${style['text-section']} ${style['white']} ${style['header-text']}`}>Now Playing</div>
            <div className={style.gap}>
              <SongQueue track={currentTrack || undefined} />
            </div>
          </div>
        </div>
        {queue && (
          <div className={style['padding-20']}>
            <div className={style.gap}>
              <div className={`${style['text-section']} ${style['flex-between-r']} ${style['white']} ${style['header-text']}`}>
                <span>Queue</span>
                <span className={`${style['delete-queue']}`} onClick={handleClearQueue}><FiTrash2 /></span>
              </div>
              <div className={style.gap}>
                {queue.slice(startIndex).map((track, index) => (
                  <SongQueue key={index} track={track} onRemove={() => handleRemoveTrack(track.track_id)} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Queue;
