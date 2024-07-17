import HeaderBar from "../components/layout/HeaderBar";
import LeftTab from "../components/layout/LeftTab"
import MainTab from "../components/page/HomePage";
import PlayerBar from "../components/layout/PlayerBar"
import RightTab from "../components/layout/RightTab"
import TrackPage from "../components/page/TrackPage";
import usePageStore from "../state/page";
import style from "../styles/LayoutPage/Layout.module.css";

const HomeLayout = () => {
  const page = usePageStore((state) => state.page)
  
  return (
    <>
    <div className={style.layout}>
      <div className={style.container}>
        <LeftTab/>
        <div className={style.main}>
          <div className={style.fixed}>
            <HeaderBar/>
          </div>
          {page === "maintab" && (<MainTab/>)}
          {page === "track" && (<TrackPage/>)}
        </div>
        <RightTab/>
      </div>
      <PlayerBar/>
    </div>
    </>
  )
}

export default HomeLayout