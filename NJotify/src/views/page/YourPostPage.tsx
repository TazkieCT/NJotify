import style from "../../styles/page/PostPage.module.css";
import usePageStore from "../../state/PageState";
import { VscVerifiedFilled } from "react-icons/vsc";
import AlbumCard from "../../components/widget/AlbumCard";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../state/AccountState";
import { useEffect, useState } from "react";
import axios from "axios";

const YourPostPage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [artist, setArtist] = useState<artist>();
  const [albums, setAlbums] = useState<albumCard[]>([]);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/artist/${user.Id}`);
        setArtist(response.data.data);
        console.log(artist)
      } catch (error) {
        console.error("Error fetching artist!", error);
      }
    };

    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/get-album-artist/${user.Id}`);
        setAlbums(response.data.data);
      } catch (error) {
        console.error("Error fetching album!", error);
      }
    };

    fetchAlbum();
    fetchArtist();
  }, [user.Id]);

  const bannerImageUrl = artist?.banner_image
    ? `http://localhost:8888/${artist.banner_image.replace(/\\/g, '/')}`
    : '';

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div 
          className={`${style["header"]} ${style["gap-2"]}  ${style['mb-2']}`} 
          style={{ backgroundImage: `url(${bannerImageUrl})` }}
        >
          <div className={`${style["flex"]} ${style["gap-2"]}`}>
            <span className={style["verif-icon"]}>
              <VscVerifiedFilled />
            </span>{" "}
            Verified Artist
          </div>
          <span className={style.title}>{artist?.artist_name}</span>
        </div>
        <div
          className={`${style["pad-content"]} ${style["flex-column"]} ${style["gap-3"]}`}
        >
          <div className={`${style["flex-column"]} ${style["gap-3"]}`}>
            <span className={style["title-content"]}>Discography</span>
            <div className={`${style["flex"]} ${style["center"]} ${style["gap-3"]} ${style["wrap"]}`}>
              <div className={style["card"]}>
                <div className={style['create-music']} onClick={() => { navigate("/create"); }}>
                  <HiPlus />
                </div>
              </div>
              <div className={`${style["flex"]} ${style["gap-3"]} ${style["wrap"]}`}>
                {albums && albums.map(albums => (
                  <AlbumCard key={albums.album_id} album={albums} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourPostPage;
