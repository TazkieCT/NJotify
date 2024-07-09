import SignNav from '../../components/SignNav'
import SignFooter from '../../components/SignFooter'
import styles from '../../styles/SignPage/Sign.module.css'
import google from '../../assets/icons8-google.svg'

const LoginForm = () => {
  return (
    <>
     <div className={styles.container}>
      <SignNav />
      <div className={styles.card}>
        <h1 className={styles['title']}>Login to Spotify</h1>
        <button className={styles['button-2']}>
          <img src={google} width={"15px"} alt="" />
          <span>Continue with Google</span>
        </button>
        <div className={styles["form"]}>
          <div className={styles["group-form"]}>
            <label className={styles["label-form"]} htmlFor="email">Email</label>
            <input className={styles["input-text"]} type="text" placeholder='Email'/>
          </div>
          <div className={styles["group-form"]}>
            <label className={styles["label-form"]} htmlFor="password">Password</label>
            <input className={styles["input-text"]} type="password" placeholder='Password'/>
          </div>
        </div>
        <button className={styles["button-1"]}>Log In</button>
        <a href="" className={styles.link2}>Forgot your password?</a>
        <hr className={styles["hr-full"]}/>
        <span className={`${styles['link2']}`}>Don't have an account? <a href="" className={styles.link2}>Sign up for NJotify</a></span>
      </div>
      <SignFooter />

</div>
    </>
  )
}

export default LoginForm