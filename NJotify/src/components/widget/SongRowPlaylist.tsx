import style from "../../styles/widget/SongRow.module.css"

const SongRowPlaylist = () => {
  return (
    <div className={style["song-row"]}>
      <div className={style["song-number-playlist"]}>1</div>
      <div className={`${style["song-name-playlist"]} ${style["flex"]}`}>
        <div className={style['image-playlist']}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_OYDA4kKvYjecstExcHZ59U9odQMFVNO4XA&s"
            alt=""/>
        </div>
        <div className="">
          <div className={style.name}>APOLOGY</div>
          <div className={style.artist}>XIO</div>
        </div>
      </div>
      <div className={style["song-album-playlist"]}>as long as you're okay</div>
      <div className={style["song-date-playlist"]}>Jul 25, 2024</div>
      <div className={style["song-duration-playlist"]}>1:47</div>
    </div>
  );
};

export default SongRowPlaylist;
