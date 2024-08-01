import { useState, useEffect } from "react";
import SignNav from "../../components/layout/SignNav";
import SignFooter from "../../components/layout/SignFooter";
import styles from "../../styles/signPage/Sign.module.css";
import google from "../../assets/icons8-google.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

const RegisForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTenChar, setIsTenChar] = useState(false);
  const [isOneLetter, setIsOneLetter] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsTenChar(password.length >= 8);
    setIsOneLetter(password.length > 0);
    const numberOrSpecialCharPattern = /[0-9.,#?!&@%]/;
    setIsSpecial(numberOrSpecialCharPattern.test(password));
  }, [password]);

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return false;
    }
    if (!email.endsWith("@gmail.com")) {
      setErrorMessage("Email must ends with @gmail.com");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    if (!isTenChar || !isOneLetter || !isSpecial) {
      setErrorMessage("Password does not meet the required criteria.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const regis = () => {
    if (!validateForm()) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8888/signup", data)
      .then((response) => {
        // console.log(response.data.data);

        const token = response.data.data;
        Cookies.set('activate-token', token, { expires: 1, path: '/' });

        navigate("/login");
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
              <input className={styles["input-text"]} type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={styles["group-form"]}>
              <label className={styles["label-form"]} htmlFor="password">
                Password
              </label>
              <input className={styles["input-text"]} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className={styles["group-form"]}>
              <label className={styles["label-form"]} htmlFor="confirm-password">
                Confirm Password
              </label>
              <input className={styles["input-text"]} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <div className={styles["group-form"]}>
              <label className={styles["label-form"]}>
                Your password must contain at least:
              </label>
              <label className={styles["label-require"]}>
                <input type="radio" className={styles["radio"]} id="letter" checked={isOneLetter} disabled/>
                1 letter
              </label>
              <label className={styles["label-require"]}>
                <input type="radio" className={styles["radio"]} id="number-special" checked={isSpecial} disabled/>
                1 number or special character (example: # ? ! &)
              </label>
              <label className={styles["label-require"]}>
                <input type="radio" className={styles["radio"]} id="ten-characters" checked={isTenChar} readOnly disabled/>
                8 characters
              </label>
            </div>
          </div>
          {errorMessage && <span className={styles["error-message"]}>{errorMessage}</span>}
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
                navigate("/login");
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
