import style from "../../styles/page/HomePage.module.css"
import GalleryCard from "../../components/widget/GalleryCard";
import AlbumCard from "../../components/widget/AlbumCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserStore from "../../state/AccountState";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  })
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.gallery}>
          <GalleryCard/>
        </div>
        <div className={style.section}>
          <div className={style["flex-between"]}>
            <span className={style.header}>Recently Played</span>
            <span className={style.link} onClick={() => {navigate("/showmore")}}>Show all</span>
          </div>
          <div className={style.flex}>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
          </div>
        </div>
        <div className={style.section}>
          <div className={style["flex-between"]}>
            <span className={style.header}>Podcast</span>
            <span className={style.link}>Show all</span>
          </div>
          <div className={style.flex}>
            <AlbumCard/>
          </div>
        </div>
        <div className={style.section}>
          <div className={style["flex-between"]}>
            <span className={style.header}>Recommended For You</span>
            <span className={style.link}>Show all</span>
          </div>
          <div className={style.flex}>
            <AlbumCard/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage