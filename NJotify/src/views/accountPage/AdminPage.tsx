import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "../../components/layout/Footer";
import style from "../../styles/accountPage/AdminPage.module.css";
import logo from '../../assets/NJOTIFY.png';
import VerifyUser from "./VerifyUser";
import { useNavigate } from "react-router-dom";

interface verifyUser {
  user: {
    Id: string;
    username: string;
    role: string;
  }
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<verifyUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<{ data: verifyUser[] }>('/admin')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  const logout = () => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
        localStorage.removeItem("user");
    }
    navigate("/login");
  };

  return (
    <div className={style['screen']}>
      <div className={style.navbar}>
        <div className={`${style['width-50']} ${style['flex-end']}`}>
          <div className={`${style['flex']} ${style['gap-1']}`}>
            <span>Admin</span>
            <span>|</span>
            <span className={`${style['logout']}`} onClick={logout}>Logout</span>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <div className={`${style['flex-column']} ${style['gap-1']} ${style['content']}`}>
          <div className={`${style['flex-column']} ${style['gap-sl']}`}>
            <span className={`${style['title']} ${style['bold']}`}>Admin Page</span>
            <span className={`${style['bold']}`}>Verify Artist</span>
          </div>
          {/* {users.map(user => (
            <VerifyUser key={user.user.Id} user={user.user} />
          ))} */}
        </div>
      </div>
      <div className={`${style['w-full']} ${style['flex-footer']}`}>
        <div className={style['pad-2']}>
          <img src={logo} alt="NJOTIFY Logo" className={style.logo} />  
        </div>
        <div className={style['width-50']}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
