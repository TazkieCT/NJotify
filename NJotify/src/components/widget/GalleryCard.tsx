import { useNavigate } from "react-router-dom";
import style from "../../styles/widget/CardGallery.module.css"

const GalleryCard = () => {
  const navigate = useNavigate();
  return (
    <div className={style["gallery-card"]} onClick={() => {navigate("/album");}}>
      <div className={style["center"]}>
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5d4fd3124301423.610137e020199.jpg"
          className={style["gallery-image"]}
          alt=""
        />
        <span>Pembohong Mahir</span>
      </div>
    </div>
  );
};

export default GalleryCard;
