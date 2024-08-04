import { useState, useEffect, useRef } from "react";
import style from "../../styles/widget/SongRow.module.css";
import PopupPlaylist from "./PopupPlaylist";
import { FaPlay } from "react-icons/fa";

const SongRowPlaylist = ({ playlist_id, track, index, fetchTrack }: { playlist_id?: string, track: trackPlaylist, index: number, fetchTrack: () => void }) => {
  const [popUp, setPopUp] = useState<{ visible: boolean, x: number, y: number }>({ visible: false, x: 0, y: 0 });
  const songRowRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const [tracks, setTracks] = useState<trackPlaylist>()
  useEffect(() => {
    if (track) {
      setTracks(track)
    }
  }, [track]);

  const handlePopUpMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setPopUp({
      visible: true,
      x: event.pageX,
      y: event.pageY,
    });
  };

  const handleClosePopUpMenu = () => {
    setPopUp({ visible: false, x: 0, y: 0 });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (songRowRef.current && !songRowRef.current.contains(event.target as Node)) {
        handleClosePopUpMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className={style["song-row"]} ref={songRowRef} onContextMenu={handlePopUpMenu}>
        <div className={style["song-number-playlist"]}>
          <span className={style['index']}>{index}</span>
          {/* onClick={togglePlay} */}
          <span className={style['play']} ><FaPlay/></span>
        </div>
        <div className={`${style["song-name-playlist"]} ${style["flex"]}`}>
          <div className={style["image-playlist"]}>
            <img
              src={`http://localhost:8888/${tracks?.track_album_image}`}
            />
          </div>
          <div className="">
            <div className={style.name}>{tracks?.track_name}</div>
            <div className={style.artist}>{tracks?.track_artist}</div>
          </div>
        </div>
        <div className={style["song-album-playlist"]}>{tracks?.track_album_name}</div>
        <div className={style["song-date-playlist"]}>{tracks?.added_at ? formatDate(tracks.added_at) : ''}</div>
        <div className={style["song-duration-playlist"]}>{formatDuration(track.track_duration)}</div>
      </div>
      {popUp.visible && playlist_id && (
        <PopupPlaylist x={popUp.x} y={popUp.y} track_id={track.track_id} playlist_id={playlist_id} onClose={handleClosePopUpMenu} fetchTrack={fetchTrack} />
      )}
    </>
  );
};

export default SongRowPlaylist;
