import style from "../../styles/widget/AlbumCard.module.css";

const ArtistCard = ({ user } : {user:userCard}) => {
  return (
    <div className={style.card}>
      <div className={style["card-image-artist"]}>
        <img
          src={`http://localhost:8888/${user.profile_image}`}
          alt=""
        />
      </div>
      <div className={style["card-text"]}>
        <span className={style["card-name"]}>{user.user_name}</span>
        <span className={style["card-desc"]}>Artist</span>
      </div>
    </div>
  );
};

export default ArtistCard;
