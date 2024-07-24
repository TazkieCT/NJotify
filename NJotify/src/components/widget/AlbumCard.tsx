import { useNavigate } from "react-router-dom";
import style from "../../styles/widget/AlbumCard.module.css"

const AlbumCard = () => {
  const navigate = useNavigate();

  return (
    <div className={style["card"]} onClick={() => {navigate("/track");}}>
      <img
        src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
        className={style["card-image"]}
        alt=""
      />
      <div className={style["card-text"]}>
        <span className={style["card-name"]}>The Weeknd</span>
        <span className={style["card-desc"]}>Los angeles I would Fkin die for you..</span>
      </div>
    </div>
  );
};

export default AlbumCard;
