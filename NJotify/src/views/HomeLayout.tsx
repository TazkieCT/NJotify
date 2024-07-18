import HeaderBar from "../components/layout/HeaderBar";
import LeftTab from "../components/layout/LeftTab"
import HomePage from "./page/HomePage";
import PlayerBar from "../components/layout/PlayerBar"
import RightTab from "../components/layout/RightTab"
import TrackPage from "./page/TrackPage";
import usePageStore from "../state/page";
import style from "../styles/layoutPage/Layout.module.css";
import ShowMorePage from "./page/ShowMorePage";
import ArtistPage from "./page/ArtistPage";

const HomeLayout = () => {
  const page = usePageStore((state) => state.page)
  
  return (
    <>
    <div className={style.layout}>
      <div className={style.container}>
        <LeftTab/>
        <div className={style.main}>
          <HeaderBar/>
          {page === "home" && (<HomePage/>)}
          {page === "track" && (<TrackPage/>)}
          {page === "showmore" && (<ShowMorePage/>)}
          {page === "artist" && (<ArtistPage/>)}
        </div>
        <RightTab/>
      </div>
      <PlayerBar/>
    </div>
    </>
  )
}

export default HomeLayout