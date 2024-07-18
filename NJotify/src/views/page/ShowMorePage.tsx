import AlbumCard from "../../components/widget/AlbumCard"
import style from "../../styles/page/ShowMorePage.module.css"

const ShowMorePage = () => {
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
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowMorePage