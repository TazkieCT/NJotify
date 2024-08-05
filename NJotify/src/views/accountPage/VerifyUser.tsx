import { useEffect, useState } from "react";
import style from "../../styles/accountPage/AdminPage.module.css";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import axios from "axios";


const VerifyUser = ({ user } : {user:userVerify}) => {
  
  const[users, setUsers] =  useState<userVerify>()
  const[userInfo, setUserInfo] =  useState<userCardVerify>()

  useEffect(() => {
    if(user){
      setUsers(user)
      // fetchArtistProfile()
    }
    // console.log(user.id)
  })

  const fetchArtistProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/get-user/${users?.id}`);
      setUserInfo(response.data.data);
    } catch (error) {
      console.error("Error fetching artist!", error);
    }
  };

  const accept = () => {
    axios.get(`http://localhost:8888/set-artist/${user.id}`)
    .then(response => {
      console.log(response);
      window.location.reload();
    })
    .catch(error => {
      console.error(error);
    });
  }

  const decline = () => {
    axios.get(`http://localhost:8888/remove-artist/${user.id}`)
    .then(response => {
      console.log(response);
      window.location.reload();
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <div className={`${style["flex"]} ${style["between"]}`}>
      <div className={`${style["gap-1"]} ${style["flex"]}`}>
        <div className={style["avatar"]}>
          <img
            className={style["photo"]}
            src={`http://localhost:8888/${userInfo?.profile}`}
            alt="User Avatar"
          />
        </div>
        <div className={`${style["flex-column"]} ${style["justify-center"]}`}>
          <span>{users?.username}</span>
          <span>Role: {users?.role}</span>
        </div>
      </div>
      <div
        className={`${style["flex"]} ${style["align-center"]} ${style["gap-sl"]}`}
      >
        <button className={`${style["button"]} ${style["decline"]}`} onClick={decline}>
          <IoClose />
        </button>
        <button className={`${style["button"]} ${style["accept"]}`} onClick={accept}>
          <FaCheck />
        </button>
      </div>
    </div>
  );
};

export default VerifyUser;
