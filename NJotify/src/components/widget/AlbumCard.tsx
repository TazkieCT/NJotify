import style from "../../styles/widget/AlbumCard.module.css"

const AlbumCard = () => {
  return (
    <div className={style["card"]}>
      <img
        src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
        className={style["card-image"]}
        alt=""
      />
      <div className={style["card-text"]}>
        <span className={style["card-name"]}>The Weeknd</span>
      </div>
    </div>
  );
};

export default AlbumCard;
