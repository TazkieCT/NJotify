import style from "../../styles/widget/SongRow.module.css"

const SongRowAlbum = () => {
  return (
    <div className={style["song-row"]}>
      <div className={style["song-number-album"]}>1</div>
      {/* <div className={style["song-image-album"]}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_OYDA4kKvYjecstExcHZ59U9odQMFVNO4XA&s"
          alt=""/>
      </div> */}
      <div className={style["song-name-album"]}>
        <div className={style.name}>Drunk</div>
        <div className={style.artist}>Keshi</div>
      </div>
      <div className={style["song-duration-album"]}>1:47</div>
    </div>
  );
};

export default SongRowAlbum;
