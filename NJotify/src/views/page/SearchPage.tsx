import AlbumCard from "../../components/widget/AlbumCard"
import style from "../../styles/page/SearchPage.module.css"

const SearchPage = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style['recent']}>
          <span className={style.header}>Recent Searches</span>
          <div className={style.flex}>
            {/* <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/>
            <AlbumCard/> */}
          </div>
        </div>
        <div className={style['browse']}>
          <span className={style.header}>Browse All</span>
          <div className={style.flex}>
            <div className={style["card"]}>
              <img src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/2abf4e124301423.610137e01f62c.jpg" className={style["card-image"]}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage