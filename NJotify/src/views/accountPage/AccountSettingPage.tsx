import Footer from "../../components/layout/Footer";
import style from "../../styles/accountPage/SettingPage.module.css";
import Navbar from "./Navbar";
import logo from '../../assets/NJOTIFY.png'
import SettingMenu from "./SettingMenu";

const AccountSettingPage = () => {
  return (
    <div className={style['screen']}>
      <Navbar />
      <div className={style.container}>
        <div className={style.content}>
          <SettingMenu/>
        </div>
      </div>
      <div className={`${style['w-full']} ${style['flex-footer']}`}>
        <div className={style['pad-2']}>
          <img src={logo} alt="Spotify Logo" className={style.logo} />  
        </div>
        <div className={style['width-50']}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AccountSettingPage;
