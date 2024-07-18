import style from "../../styles/page/HomePage.module.css"
import usePageStore from "../../state/page";
import GalleryCard from "../../components/widget/GalleryCard";
import AlbumCard from "../../components/widget/AlbumCard";

const HomePage = () => {
  const changePage = usePageStore((state) => state.changePage)
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.gallery}>
          <GalleryCard/>
        </div>
        <div className={style.section}>
          <div className={style["flex-between"]}>
            <span className={style.header}>Recently Played</span>
            <span className={style.link} onClick={() => {changePage("showmore")}}>Show all</span>
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