import SignNav from '../../components/layout/SignNav'
import SignFooter from '../../components/layout/SignFooter'
import styles from '../../styles/signPage/Sign.module.css'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '../../state/AccountState';
import { API_URL } from '../../config/api';

const ResetPasswordForm = () => {
  const { tokenId } = useParams<{ tokenId: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTenChar, setIsTenChar] = useState(false);
  const [isOneLetter, setIsOneLetter] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      if (parsedUser.Id !== "") {
        navigate('/home');
      }
    }
  }, [navigate, setUser]);

  useEffect(() => {
    setIsTenChar(password.length >= 8);
    setIsOneLetter(password.length > 0);
    const numberOrSpecialCharPattern = /[0-9.,#?!&@%]/;
    setIsSpecial(numberOrSpecialCharPattern.test(password));
  }, [password]);

  const validateForm = () => {
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

  const reset = () => {
    if (!validateForm()) {
      return;
    }

    const data = {
      reset_token: tokenId,
      password: password,
    };

    console.log(data);

    axios
      .post(`${API_URL}/reset`, data)
      .then((response) => {
        // console.log(response.data.data);
        localStorage.removeItem("reset-token");

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
        <h1 className={styles['title']}>Reset Password</h1>
        <div className={styles["reset"]}>
          <div className={styles["group-form"]}>
            <label className={styles["label-form"]} htmlFor="password">Password</label>
            <input className={styles["input-text"]} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className={styles["group-form"]}>
            <label className={styles["label-form"]} htmlFor="password">Confirm Password</label>
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
        <button className={styles["button-1"]} onClick={reset}>Reset Password</button>
      </div>
      <SignFooter />
     </div>
    </>
  )
}

export default ResetPasswordForm