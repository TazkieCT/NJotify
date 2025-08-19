import SignNav from "../../components/layout/SignNav";
import SignFooter from "../../components/layout/SignFooter";
import styles from "../../styles/signPage/Sign.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../../state/AccountState";
import { API_URL } from "../../config/api";

const Activation = () => {
  const { tokenId } = useParams<{ tokenId: string }>();
  const [ status, setStatus ] = useState("Loading...");
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

    const activate = async () => {
      try {
        const response = await axios.get(`${API_URL}/activate/${tokenId}`);
        if(response){
            setStatus("Active")
            localStorage.removeItem("activate-token");
            navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching album!", error);
      }
    };

    activate();
  }, [tokenId]);

  return (
    <>
      <div className={styles.container}>
        <SignNav />
        <div className={styles.card}>
          <h1 className={styles["title"]}>Your Account</h1>
          <div className={styles["form"]}>
              <h1>{status}</h1>
          </div>
          <a
            className={`${styles.link2} ${styles.pointer}`}
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Back to Login
          </a>
        </div>
        <SignFooter />
      </div>
    </>
  );
};

export default Activation;
