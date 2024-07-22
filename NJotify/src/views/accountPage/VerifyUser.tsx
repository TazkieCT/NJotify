import style from "../../styles/accountPage/AdminPage.module.css";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const VerifyUser = () => {
  return (
    <div className={`${style["flex"]}  ${style["between"]}`}>
      <div className={`${style["gap-1"]} ${style["flex"]}`}>
        <div className={style["avatar"]}>
          <img
            className={style["photo"]}
            src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
            alt=""
          />
        </div>
        <div className={`${style["flex-column"]} ${style["justify-center"]}`}>
          <span>Name</span>
          <span>1K Follower 25 Following</span>
        </div>
      </div>
      <div
        className={`${style["flex"]} ${style["align-center"]} ${style["gap-sl"]}`}
      >
        <button className={`${style["button"]} ${style["decline"]}`}>
          <IoClose />
        </button>
        <button className={`${style["button"]} ${style["accept"]}`}>
          <FaCheck />
        </button>
      </div>
    </div>
  );
};

export default VerifyUser;
