import style from '../../styles/accountPage/SettingPage.module.css';
import { CgProfile } from 'react-icons/cg';
import logo from '../../assets/NJOTIFY.png'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className={style.navbar}>
      <div className={`${style['width-50']} ${style['flex-between']}`}>
        <img src={logo} alt="Spotify Logo" className={style.logo} onClick={() => navigate('/home')}/>
        <div className={style.userInfo}>
          <span>Free Plan | </span>
          <div className={style.profileIcon}>
            <CgProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
