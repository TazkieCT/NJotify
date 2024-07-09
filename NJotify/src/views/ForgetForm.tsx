import SignNav from '../components/SignNav'
import SignFooter from '../components/SignFooter'
import styles from '../styles/SignPage/Sign.module.css'
import google from '../assets/icons8-google.svg'

const ForgetForm = () => {
  return (
    <>
      <SignNav />
      <div className={styles.card}>
        <h1 className={styles['title']}>Find Your Account</h1>
        <div className={styles["form"]}>
          <div className={styles["group-form"]}>
            <label className={styles["label-form"]} htmlFor="email">Email</label>
            <input className={styles["input-text"]} type="text" placeholder='Email'/>
          </div>
        </div>
        <button className={styles["button-1"]}>Search</button>
        <a href="" className={styles.link2}>Cancel</a>
      </div>

      <SignFooter />
    </>
  )
}

export default ForgetForm