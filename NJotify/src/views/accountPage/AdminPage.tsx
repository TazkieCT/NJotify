import Footer from "../../components/layout/Footer";
import style from "../../styles/accountPage/AdminPage.module.css";
import logo from '../../assets/NJOTIFY.png'
import VerifyUser from "./VerifyUser";

const AdminPage = () => {
  return (
    <div className={style['screen']}>
      <div className={style.navbar}>
        <div className={`${style['width-50']} ${style['flex-end']}`}>
          <div className={`${style['flex']} ${style['gap-1']}`}>
            <span>Admin</span>
            <span>|</span>
            <span className={`${style['logout']}`}>Logout</span>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <div className={`${style['flex-column']} ${style['gap-1']} ${style['content']}`}>
          <div className={`${style['flex-column']} ${style['gap-sl']}`}>
            <span className={`${style['title']} ${style['bold']}`}>Admin Page</span>
            <span className={`${style['bold']}`}>Verify Artist</span>
          </div>
          <VerifyUser/>
          <VerifyUser/>
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
  )
}

export default AdminPage