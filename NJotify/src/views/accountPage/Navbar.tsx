import style from '../../styles/accountPage/SettingPage.module.css';
import { CgProfile } from 'react-icons/cg';
import logo from '../../assets/NJOTIFY.png'

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <div className={`${style['width-3']} ${style['flex-between']}`}>
        <img src={logo} alt="Spotify Logo" className={style.logo} />
        <div className={style.userInfo}>
          <span>Free Plan</span>
          <div className={style.profileIcon}>
            <CgProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
