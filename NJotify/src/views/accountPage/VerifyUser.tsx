import { useEffect, useState } from "react";
import style from "../../styles/accountPage/AdminPage.module.css";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import axios from "axios";


const VerifyUser = ({ user } : {user:userVerify}) => {
  
  const[users, setUsers] =  useState<userVerify>()

  useEffect(() => {
    if(user){
      setUsers(user)
    }
    // console.log(user.id)
  })

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
            src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
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
