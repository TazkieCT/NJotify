import { useNavigate } from "react-router-dom";
import style from "../../styles/widget/AlbumCard.module.css"
import { useEffect, useState } from "react";

const DiscographyCard = ({ album } : {album:albumCard}) => {
  const navigate = useNavigate();

  const[albums, setAlbums] =  useState<albumCard>()
  useEffect(() => {
    if(album){
      setAlbums(album)
    }
  })

  const handleClick = () => {
    if (albums) {
      navigate(`/album/${albums.album_id}`);
    }
  };

  const formatYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <div className={style.card} onClick={handleClick}>
      <div className={style["card-image-wrapper"]}>
        <img
          src={`http://localhost:8888/${albums?.album_image}`}
          className={style["card-image"]}
          alt=""
        />
      </div>
      <div className={style["card-text"]}>
        <span className={style["card-name"]}>{albums?.album_name}</span>
        <span className={style["card-desc"]}>{albums?.album_time ? formatYear(albums.album_time) : ''} · {albums?.album_type}</span>
      </div>
    </div>
  );
};

export default DiscographyCard;
