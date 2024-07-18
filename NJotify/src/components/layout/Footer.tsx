import style from "../../styles/layoutPage/Footer.module.css"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={style.footer}>
            <div className={style['flex-between']}>
              <div className={style['section']}>
                <div className={style['subsection']}>
                  <span className={style['section-header']}>Company</span>
                  <span className={style['section-link']}>About</span>
                  <span className={style['section-link']}>Jobs</span>
                  <span className={style['section-link']}>Company</span>
                  <span className={style['section-link']}>For the Record</span>
                </div>
                <div className={style['subsection']}>
                  <span className={style['section-header']}>Communities</span>
                  <span className={style['section-link']}>For Artists</span>
                  <span className={style['section-link']}>Developers</span>
                  <span className={style['section-link']}>Advertising</span>
                  <span className={style['section-link']}>Investors</span>
                  <span className={style['section-link']}>Vendors</span>
                </div>
                <div className={style['subsection']}>
                  <span className={style['section-header']}>Useful links</span>
                  <span className={style['section-link']}>Support</span>
                  <span className={style['section-link']}>Free Mobile App</span>
                </div>
                <div className={style['subsection']}>
                  <span className={style['section-header']}>Njotify Plans</span>
                  <span className={style['section-link']}>Premium Individual</span>
                  <span className={style['section-link']}>Premium Duo</span>
                  <span className={style['section-link']}>Premium Family</span>
                  <span className={style['section-link']}>Premium Student</span>
                  <span className={style['section-link']}>Njotify Free</span>
                </div>
              </div>
              <div className={style['social-media']}>
                <FaInstagram/>
                <FaTwitter/>
                <FaFacebook/>
              </div>
            </div>
            <div className={style['flex-between']}>
              <div className={style.other}>
                <span className={style['other-link']}>Legal</span>
                <span className={style['other-link']}>Safety & Privacy Center</span>
                <span className={style['other-link']}>Privacy Policy</span>
                <span className={style['other-link']}>Cookies</span>
                <span className={style['other-link']}>About Ads</span>
                <span className={style['other-link']}>Accessibility</span>
              </div>
              <span  className={style['copyright']}>&copy; 2024 Njotify AB</span>
            </div>
          </div>
  )
}

export default Footer