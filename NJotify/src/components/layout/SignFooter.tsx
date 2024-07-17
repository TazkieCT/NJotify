import styles from '../../styles/SignPage/Sign.module.css'
import logo from '../../assets/NJOTIFY.png'
const SignFooter = () => {
  return (
    <div className={styles['w-full']}>
        <div className={styles.footer}>
          <div className={styles['link-foot']}>
            <img src={logo} width={80} className={styles['logo-footer']} alt="logo" />
            <a href="#" className={styles.link}>Hukum</a>
            <a href="#" className={styles.link}>Pusat Keamanan & Privasi</a>
            <a href="#" className={styles.link}>Kebijakan Privasi</a>
            <a href="#" className={styles.link}>Cookie</a>
            <a href="#" className={styles.link}>Tentang Iklan</a>
            <a href="#" className={styles.link}>Aksebilitas</a>
          </div>
          <div className="">
            <a className={styles.link}>&copy; 2024 Spotify AB</a>
          </div>
        </div>
    </div>
  )
}

export default SignFooter