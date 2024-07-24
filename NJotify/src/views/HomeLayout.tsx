import HeaderBar from "../components/layout/HeaderBar";
import LeftTab from "../components/layout/LeftTab"
import PlayerBar from "../components/layout/PlayerBar"
import RightTab from "../components/layout/RightTab"
import style from "../styles/layoutPage/Layout.module.css";
import useRightTabStore from "../state/RightBarState";
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  const { isOpen } = useRightTabStore();

  return (
    <>
    <div className={style.layout}>
      <div className={style.container}>
        <LeftTab/>
        <div className={`${style.main} ${!isOpen ? style.fullWidth : ''}`}>
          <HeaderBar />
          <Outlet />
        </div>
        {isOpen && <RightTab/>} 
      </div>
      <PlayerBar/>
    </div>
    </>
  )
}

export default HomeLayout