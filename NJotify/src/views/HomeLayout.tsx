import HeaderBar from "../components/layout/HeaderBar";
import LeftTab from "../components/layout/LeftTab"
import HomePage from "./page/HomePage";
import PlayerBar from "../components/layout/PlayerBar"
import RightTab from "../components/layout/RightTab"
import TrackPage from "./page/TrackPage";
import usePageStore from "../state/PageState";
import style from "../styles/layoutPage/Layout.module.css";
import ShowMorePage from "./page/ShowMorePage";
import ArtistPage from "./page/ArtistPage";
import useRightTabStore from "../state/RightBarState";
import SearchPage from "./page/SearchPage";

const HomeLayout = () => {
  const page = usePageStore((state) => state.page)
  const { isOpen } = useRightTabStore();

  return (
    <>
    <div className={style.layout}>
      <div className={style.container}>
        <LeftTab/>
        <div className={`${style.main} ${!isOpen ? style.fullWidth : ''}`}>
          <HeaderBar />
          {page === "home" && <HomePage />}
          {page === "track" && <TrackPage />}
          {page === "showmore" && <ShowMorePage />}
          {page === "artist" && <ArtistPage />}
          {page === "search" && <SearchPage />}
        </div>
        {isOpen && <RightTab/>} 
      </div>
      <PlayerBar/>
    </div>
    </>
  )
}

export default HomeLayout