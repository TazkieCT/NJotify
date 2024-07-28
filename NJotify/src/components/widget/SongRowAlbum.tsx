import style from "../../styles/widget/SongRow.module.css"

const SongRowAlbum = ({ track, index } : { track: trackAlbum, index: number }) => {
  return (
    <div className={style["song-row"]}>
      <div className={style["song-number-album"]}>{index}</div>
      <div className={style["song-name-album"]}>
        <div className={style.name}>{track.song_name}</div>
        <div className={style.artist}>{track.song_artist}</div>
      </div>
      <div className={style["song-duration-album"]}>1:47</div>
    </div>
  );
};

export default SongRowAlbum;
