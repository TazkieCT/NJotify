import SignNav from "../../components/SignNav";
import SignFooter from "../../components/SignFooter";
import styles from "../../styles/SignPage/Sign.module.css";
import { useNavigate } from "react-router-dom";

const ForgetForm = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <SignNav />
        <div className={styles.card}>
          <h1 className={styles["title"]}>Find Your Account</h1>
          <div className={styles["form"]}>
            <div className={styles["group-form"]}>
              <label className={styles["label-form"]} htmlFor="email">
                Email
              </label>
              <input
                className={styles["input-text"]}
                type="text"
                placeholder="Email"
              />
            </div>
          </div>
          <button className={styles["button-1"]}>Search</button>
          <a
            className={`${styles.link2} ${styles.pointer}`}
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Cancel
          </a>
        </div>
        <SignFooter />
      </div>
    </>
  );
};

export default ForgetForm;
