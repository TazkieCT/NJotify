import style from "../../styles/widget/AlbumCard.module.css";

const ArtistCard = () => {
  return (
    <div className={style.card}>
      <div className={style["card-image-artist"]}>
        <img
          src="https://imgx.sonora.id/crop/0x0:0x0/x/photo/2023/01/26/sal-priadi_nadinjpg-20230126090957.jpg"
          alt=""
        />
      </div>
      <div className={style["card-text"]}>
        <span className={style["card-name"]}>Sal Priadi</span>
        <span className={style["card-desc"]}>Artist</span>
      </div>
    </div>
  );
};

export default ArtistCard;
