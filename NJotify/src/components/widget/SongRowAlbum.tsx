import style from "../../styles/widget/SongRow.module.css"

const SongRowAlbum = () => {
  return (
    <div className={style["song-row"]}>
      <div className={style["song-number-album"]}>1</div>
      <div className={style["song-name-album"]}>
        <div className={style.name}>Drunk</div>
        <div className={style.artist}>Keshi</div>
      </div>
      <div className={style["song-duration-album"]}>1:47</div>
    </div>
  );
};

export default SongRowAlbum;
