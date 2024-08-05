import { useEffect, useState } from "react";
import AlbumCard from "../../components/widget/AlbumCard"
import style from "../../styles/page/ShowMorePage.module.css"
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const ShowMorePage = () => {
  const [albums, setAlbums] = useState<albumCard[]>([]);
  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');
  const type = searchParams.get('type');

  const handleMissingId = () => {
    if (!id) {
      // return <p>No ID provided</p>;
    }
    // return <p>ID: {id}</p>;
  };

  useEffect(() => {
    if(!id && type === "album"){
      axios.get('http://localhost:8888/get-all-album')
        .then(response => {
          setAlbums(response.data.data);
          // console.log(response.data.data)
        })
        .catch(error => {
          console.error("Error fetching album!", error);
        });
    }
  }, []);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
            <span className={style.title}>Music</span>
            {/* {handleMissingId()} */}
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