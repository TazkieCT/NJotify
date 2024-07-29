import { useEffect, useState } from "react";
import AlbumCard from "../../components/widget/AlbumCard"
import style from "../../styles/page/ShowMorePage.module.css"
import axios from "axios";

const ShowMorePage = () => {
  const [albums, setAlbums] = useState<albumCard[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8888/get-all-album')
      .then(response => {
        setAlbums(response.data.data);
        // console.log(response.data.data)
      })
      .catch(error => {
        console.error("Error fetching album!", error);
      });
  }, []);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
            <span className={style.title}>Music</span>
        </div>
        <div className={style.section}>
          <div className={style["flex-between"]}>
            <span className={style.subtitle}>Latest Music</span>
          </div>
          <div className={style.flex}>
            {albums && albums.map(albums => (
              <AlbumCard key={albums.album_id} album={albums} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowMorePage