import styles from '../../styles/signPage/Sign.module.css'
import logo from '../../assets/NJOTIFY.png'
const SignNav = () => {
  return (
    <div className={styles['w-full']}>
        <div className={styles.nav}>
          <img src={logo} width="120" alt="logo" />
        </div>
    </div>
  )
}

export default SignNav