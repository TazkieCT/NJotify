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
                  <a href="https://www.spotify.com/id-id/about-us/contact/" className={style['section-link']}>About</a>
                  <a href="https://www.lifeatspotify.com/" className={style['section-link']}>Jobs</a>
                  <a href="" className={style['section-link']}>Company</a>
                  <a href="https://newsroom.spotify.com/" className={style['section-link']}>For the Record</a>
                </div>
                <div className={style['subsection']}>
                  <span className={style['section-header']}>Communities</span>
                  <a href="https://artists.spotify.com/home" className={style['section-link']}>For Artists</a>
                  <a href="https://developer.spotify.com/" className={style['section-link']}>Developers</a>
                  <a href="https://ads.spotify.com/en-US/" className={style['section-link']}>Advertising</a>
                  <a href="https://investors.spotify.com/home/default.aspx" className={style['section-link']}>Investors</a>
                  <a href="https://spotifyforvendors.com/" className={style['section-link']}>Vendors</a>
                </div>
                <div className={style['subsection']}>
                  <span className={style['section-header']}>Useful links</span>
                  <a href="https://support.spotify.com/id-id/" className={style['section-link']}>Support</a>
                  <a href="https://www.spotify.com/id-id/download/windows/" className={style['section-link']}>Free Mobile App</a>
                </div>
                <div className={style['subsection']}>
                  <span className={style['section-header']}>Njotify Plans</span>
                  <a href="https://www.spotify.com/id-id/premium/?ref=spotifycom_footer_premium_individual" className={style['section-link']}>Premium Individual</a>
                  <a href="https://www.spotify.com/id-id/duo/?ref=spotifycom_footer_premium_duo" className={style['section-link']}>Premium Duo</a>
                  <a href="https://www.spotify.com/id-id/family/?ref=spotifycom_footer_premium_family" className={style['section-link']}>Premium Family</a>
                  <a href="https://www.spotify.com/id-id/student/?ref=spotifycom_footer_premium_student" className={style['section-link']}>Premium Student</a>
                  <a href="https://www.spotify.com/id-id/free/?ref=spotifycom_footer_free" className={style['section-link']}>Njotify Free</a>
                </div>
              </div>
              <div className={style['social-media']}>
                <a href="https://www.instagram.com/spotify">
                  <FaInstagram/>
                </a>
                <a href="https://x.com/spotify">
                  <FaTwitter/>
                </a>
                <a href="https://www.facebook.com/SpotifyID/?brand_redir=6243987495">
                  <FaFacebook/>
                </a>
              </div>
            </div>
            <div className={style['flex-between']}>
              <div className={style.other}>
                <a href="https://www.spotify.com/id-id/legal/end-user-agreement/" className={style['other-link']}>Legal</a>
                <a href="https://www.spotify.com/id-id/safetyandprivacy" className={style['other-link']}>Safety & Privacy Center</a>
                <a href="https://www.spotify.com/id-id/legal/privacy-policy/" className={style['other-link']}>Privacy Policy</a>
                <a href="https://www.spotify.com/id-id/legal/cookies-policy/" className={style['other-link']}>Cookies</a>
                <a href="https://www.spotify.com/id-id/legal/privacy-policy/#s3" className={style['other-link']}>About Ads</a>
                <a href="https://www.spotify.com/id-id/accessibility" className={style['other-link']}>Accessibility</a>
              </div>
              <span  className={style['copyright']}>&copy; 2024 Njotify AB</span>
            </div>
          </div>
  )
}

export default Footer