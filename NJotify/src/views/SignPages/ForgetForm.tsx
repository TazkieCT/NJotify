import { useEffect, useState } from "react";
import SignNav from "../../components/layout/SignNav";
import SignFooter from "../../components/layout/SignFooter";
import styles from "../../styles/signPage/Sign.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import useUserStore from "../../state/AccountState";

const ForgetForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
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

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const regis = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    axios.get(`http://localhost:8888/forgot/${email}`)
      .then((response) => {
        const token = response.data.data;
        Cookies.set('reset-token', token, { expires: 1, path: '/' });
        navigate("/login");
      })
      .catch((error) => {
        console.error("There was an error registering!", error);
        setError("Error Please try again.");
      });
  };

  const handleCancelClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/login");
  };

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
                value={email}
                onChange={handleInputChange}
              />
              {error && <p className={styles.error}>{error}</p>}
            </div>
          </div>
          <button className={styles["button-1"]} onClick={regis}>Search</button>
          <a className={`${styles.link2} ${styles.pointer}`} onClick={handleCancelClick}>
            Cancel
          </a>
        </div>
        <SignFooter />
      </div>
    </>
  );
};

export default ForgetForm;
