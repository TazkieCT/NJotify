import LeftTab from "../components/LeftTab"
import MainTab from "../components/MainTab";
import PlayerBar from "../components/PlayerBar"
import RightTab from "../components/RightTab"
import style from "../styles/LayoutPage/Layout.module.css";

const HomeLayout = () => {
  return (
    <>
    <div className={style.layout}>
      <div className={style.container}>
        <LeftTab/>
        <MainTab/>
        <RightTab/>
      </div>
      <PlayerBar/>
    </div>
    </>
  )
}

export default HomeLayout