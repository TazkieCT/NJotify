import SignNav from '../../components/SignNav'
import SignFooter from '../../components/SignFooter'
import styles from '../../styles/SignPage/Sign.module.css'

const ResetPasswordForm = () => {
  return (
    <>
      <SignNav />
      <div className={styles.card}>
        <h1 className={styles['title']}>Reset Password</h1>
        <div className={styles["reset"]}>
          <div className={styles["group-form"]}>
            <label className={styles["label-form"]} htmlFor="password">Password</label>
            <input className={styles["input-text"]} type="password" placeholder='Password'/>
          </div>
          <div className={styles["group-form"]}>
            <label className={styles["label-form"]} htmlFor="password">Confirm Password</label>
            <input className={styles["input-text"]} type="password" placeholder='Password'/>
          </div>
          <div className={styles["group-form"]}>
            <label className={styles["label-form"]} >Your password must contain at least:</label>
            <label className={styles["label-require"]} >1 letter</label>
            <label className={styles["label-require"]} >1 number or special character (example: # ? ! &)</label>
            <label className={styles["label-require"]} >10 characters</label>
          </div>
        </div>
        <button className={styles["button-1"]}>Reset Password</button>
      </div>

      <SignFooter />
    </>
  )
}

export default ResetPasswordForm