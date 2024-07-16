import { useState, useEffect } from "react";
import SignNav from "../../components/SignNav";
import SignFooter from "../../components/SignFooter";
import styles from "../../styles/SignPage/Sign.module.css";
import google from "../../assets/icons8-google.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTenChar, setIsTenChar] = useState(false);
  const [isOneLetter, setIsOneLetter] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsTenChar(password.length >= 10);
    setIsOneLetter(password.length > 0);
    const numberOrSpecialCharPattern = /[0-9.,#?!&@%]/;
    setIsSpecial(numberOrSpecialCharPattern.test(password));
  }, [password]);

  const regis = () => {
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8888/log", data, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        navigate("/home");
      })
      .catch((error) => {
        console.error("There was an error registering!", error);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <SignNav />
        <div className={styles.card}>
          <h1 className={styles["title"]}>Sign Up to start listening</h1>
          <button className={styles["button-2"]}>
            <img src={google} width={"15px"} alt="" />
            <span>Continue with Google</span>
          </button>
          <div className={styles["form"]}>
            <div className={styles["group-form"]}>
              <label className={styles["label-form"]} htmlFor="email">
                Email
              </label>
              <input
                className={styles["input-text"]}
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles["group-form"]}>
              <label className={styles["label-form"]} htmlFor="password">
                Password
              </label>
              <input
                className={styles["input-text"]}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles["group-form"]}>
              <label
                className={styles["label-form"]}
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                className={styles["input-text"]}
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <div className={styles["group-form"]}>
              <label className={styles["label-form"]}>
                Your password must contain at least:
              </label>
              <label className={styles["label-require"]}>
                <input
                  type="radio"
                  className={styles["radio"]}
                  id="letter"
                  checked={isOneLetter}
                  disabled
                />
                1 letter
              </label>
              <label className={styles["label-require"]}>
                <input
                  type="radio"
                  className={styles["radio"]}
                  id="number-special"
                  checked={isSpecial}
                  disabled
                />
                1 number or special character (example: # ? ! &)
              </label>
              <label className={styles["label-require"]}>
                <input
                  type="radio"
                  className={styles["radio"]}
                  id="ten-characters"
                  checked={isTenChar}
                  readOnly
                  disabled
                />
                10 characters
              </label>
            </div>
          </div>
          <button className={styles["button-1"]} onClick={regis}>
            Sign Up
          </button>
          <hr className={styles["hr-full"]} />
          <span className={`${styles["link2"]}`}>
            Already have an account?{" "}
            <a
              className={styles.pointer}
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Log in to NJotify
            </a>
          </span>
        </div>
        <SignFooter />
      </div>
    </>
  );
};

export default RegisForm;
