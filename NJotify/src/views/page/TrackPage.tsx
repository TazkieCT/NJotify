import { FaPlay } from "react-icons/fa6"
import Footer from "../../components/layout/Footer"
import style from "../../styles/page/TrackPage.module.css"
import { RxDotsHorizontal } from "react-icons/rx"
import { BsPlusCircle } from "react-icons/bs";
import SongRow from "../../components/widget/SongRow";
import SongRowAlbum from "../../components/widget/SongRowAlbum";


const TrackPage = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
          <div className={style['profile-avatar']}>
            <img src="https://i.scdn.co/image/ab67616d0000b273823f0f032dd2337fabdca8e0" className={style['profile-image']} alt="" />
          </div>
          <div className={style['profile-info']}>
            <span className={`${style.small}`}>Song</span>
            <span className={`${style.title} ${style['mb-2']}`}>Drunk</span>
            <span className={style.small}>Keshi · always · 2020 · 2:52 · 57,419,073</span>
          </div>
        </div>
        <div className={`${style.section} ${style['gap-2']} ${style['flex-col']}`}>
            <div className={`${style.flex} ${style['gap-20']} ${style['pad-lu']}`}>
              <span className={style['play-btn']}><FaPlay/></span>
              <span className={style.medium}><BsPlusCircle/></span>
              <span className={style.medium}><RxDotsHorizontal/></span>
            </div>
            <div className={`${style['pad-lu']} ${style['flex-col']} ${style['gap-2']}`}>
              <span className={`${style['small']} ${style['gray']}`}>Popular Tracks by</span>
              <span className={style.name}>Keshi</span>
              <div className="">
                <SongRow/>
                <SongRow/>
                <SongRow/>
                <SongRow/>
              </div>
              <div>
                <span className={`${style['gray']} ${style['see-more']}`}>See more</span>
              </div>
            </div>
            <div className={`${style['pad-lu']} ${style['flex-col']}`}>
              <div className={style['player-info']}>
                <img className={style['album-cover']} src="https://upload.wikimedia.org/wikipedia/id/thumb/c/c2/Radwimps_Your_Name_Album_Cover.jpg/220px-Radwimps_Your_Name_Album_Cover.jpg" alt="" />
                <div className={style.col}>
                  <span className={style['album-subtitle']}>From the single</span>
                  <span className={style['album-title']}>Goddes</span>
                </div>
              </div>
              <div className="">
                <SongRowAlbum/>
              </div>
            </div>
            <div className={`${style['pad-lu']} ${style['flex-col']}`}>
              <span className={style['album-subtitle']}>March 6, 2024</span>
              <span className={style['album-subtitle']}>&copy; 2024 Vingolf Recordings under exclusive license to AWAL Recordings America, Inc.</span>
              <span className={style['album-subtitle']}>&copy; 2024 Vingolf Recordings under exclusive license to AWAL Recordings America, Inc.</span>
            </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default TrackPage