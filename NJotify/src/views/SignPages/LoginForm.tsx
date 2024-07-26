import { useEffect, useState } from "react";
import SignNav from "../../components/layout/SignNav";
import SignFooter from "../../components/layout/SignFooter";
import styles from "../../styles/signPage/Sign.module.css";
import google from "../../assets/icons8-google.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "../../state/AccountState";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useUserStore();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      navigate("/home");
    }
  }, [setUser, navigate]);

  const validateForm = () => {
    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return false;
    }
    // if (!email.endsWith("@gmail.com")) {
    //   setErrorMessage("Email must ends with @gmail.com");
    //   return false;
    // }
    setErrorMessage("");
    return true;
  };

  const login = async () => {
    if (!validateForm()) {
      return;
    }
  
    const data = {
      email: email,
      password: password,
    };
  
    try {
      const response = await axios.post("http://localhost:8888/login", data);
      const userData = response.data.data;
      console.log(userData);
      setUser({
        Id: userData.Id,
        Email: userData.Email,
        Username: userData.username,
        Gender: userData.gender,
        Dob: userData.dob,
        Country: userData.country,
        Role: userData.role,
      });

      if(userData.role === "admin") {
        navigate("/admin");
      }else{
        navigate("/home");
      }
    } catch (error) {
      if (error) {
        setErrorMessage("Username or password incorrect");
        // console.error("Response error:", error);
      }
    }
  };
  

  return (
    <>
      <div className={styles.container}>
        <SignNav />
        <div className={styles.card}>
          <h1 className={styles["title"]}>Login to Spotify</h1>
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
          </div>
          {errorMessage && <span className={styles["error-message"]}>{errorMessage}</span>}
          <button className={styles["button-1"]} onClick={login}>Log In</button>
          <a
            className={`${styles.link2} ${styles.pointer}`}
            onClick={(e) => {
              e.preventDefault();
              navigate("/forget");
            }}
          >
            Forgot your password?
          </a>
          <hr className={styles["hr-full"]} />
          <span className={`${styles["link2"]}`}>
            Don't have an account?{" "}
            <a
              className={styles.pointer}
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              Sign up for NJotify
            </a>
          </span>
        </div>
        <SignFooter />
      </div>
    </>
  );
};

export default LoginForm;
