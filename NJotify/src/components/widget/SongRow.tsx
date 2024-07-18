import style from "../../styles/widget/SongRow.module.css"

const SongRow = () => {
  return (
    <div className={style["song-row"]}>
      <div className={style["song-number"]}>1</div>
      <div className={style["song-image"]}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_OYDA4kKvYjecstExcHZ59U9odQMFVNO4XA&s"
          alt=""/>
      </div>
      <div className={style["song-name"]}>Kuaminkan dengan lantang</div>
      <div className={style["song-popularity"]}>345.167</div>
      <div className={style["song-duration"]}>1:47</div>
    </div>
  );
};

export default SongRow;
