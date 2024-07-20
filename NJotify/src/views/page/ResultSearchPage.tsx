import AlbumCard from "../../components/widget/AlbumCard"
import ArtistCard from "../../components/widget/ArtistCard"
import TopSearch from "../../components/widget/TopSearch"
import style from "../../styles/page/SearchPage.module.css"
const ResultSearchPage = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={`${style['result']} ${style['flex']}`}>
          <div className={`${style['top-result']} ${style['gap-result']}`}>
            <span className={style.header}>Top Results</span>
            <div className={style['highlight-song']}>
                <div className={style['highlight-image']}>
                    <img src="https://images.genius.com/a58e5ee2431e0a3cc0838d0820501a23.1000x1000x1.jpg" className={style['top-image']} alt="" />
                </div>
                <div className={`highlight-text`}>
                    <span className={style['highlight-title']}>Nama Yang Kueja</span>
                    <span className={style['highlight-subtitle']}>Artist · <span className={style['name-subtitle']}>Sang Artis</span></span>
                </div>
            </div>
          </div>
          <div className={style['songs-result']}>
            <span className={style.header}>Songs</span>
            <div className={style['top-songs']}>
                <TopSearch/>
                <TopSearch/>
                <TopSearch/>
                <TopSearch/>
                <TopSearch/>
            </div>
          </div>
        </div>
        <div className={style['artist']}>
          <span className={style.header}>Artist</span>
          <div className={style.flex}>
            <ArtistCard/>
            <ArtistCard/>
            <ArtistCard/>
          </div>
        </div>
        <div className={style['browse']}>
          <span className={style.header}>Collections</span>
          <div className={style.flex}>
            <AlbumCard/>
            <AlbumCard/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultSearchPage