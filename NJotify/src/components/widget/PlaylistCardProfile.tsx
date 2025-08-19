import { useNavigate } from "react-router-dom";
import style from "../../styles/widget/AlbumCard.module.css"
import { useEffect, useState } from "react";
import { API_URL } from "../../config/api";

const PlaylistCardProfile = ({ playlist, username } : {playlist:playlist, username: string}) => {
  const navigate = useNavigate();

  const[playlists, setPlaylists] =  useState<playlist>()
  useEffect(() => {
    if(playlist){
      setPlaylists(playlist)
    }
  })

  const handleClick = () => {
    if (playlists) {
      navigate(`/playlist/${playlist.playlist_id}`);
    }
  };

  return (
    <div className={style.card} onClick={handleClick}>
      <div className={style["card-image-wrapper"]}>
        <img
          src={`${API_URL}/${playlists?.playlist_image}`}
          className={style["card-image"]}
          alt=""
        />
      </div>
      <div className={style["card-text"]}>
        <span className={style["card-name"]}>{playlists?.playlist_name}</span>
        <span className={style["card-desc"]}>Made by {username}</span>
      </div>
    </div>
  );
};

export default PlaylistCardProfile;
