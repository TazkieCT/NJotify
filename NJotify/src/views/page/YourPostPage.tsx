import style from "../../styles/page/PostPage.module.css";
import usePageStore from "../../state/PageState";
import { VscVerifiedFilled } from "react-icons/vsc";
import AlbumCard from "../../components/widget/AlbumCard";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const YourPostPage = () => {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={`${style["header"]} ${style["gap-2"]}  ${style['mb-2']}`}>
          <div className={`${style["flex"]} ${style["gap-2"]}`}>
            <span className={style["verif-icon"]}>
              <VscVerifiedFilled />
            </span>{" "}
            Verified Artist
          </div>
          <span className={style.title}>Sang Artist</span>
        </div>
        <div
          className={`${style["pad-content"]} ${style["flex-column"]} ${style["gap-3"]}`}
        >
          <div className={`${style["flex-column"]} ${style["gap-3"]}`}>
            <span className={style["title-content"]}>Discography</span>
            <div className={`${style["flex"]} ${style["gap-3"]} ${style["wrap"]}`}>
              <div className={style["card"]}>
                <div className={style['create-music']} onClick={() => {navigate("/create");}}>
                    <HiPlus/>
                </div>
              </div>
              <AlbumCard />
              <AlbumCard />
              <AlbumCard />
              <AlbumCard />
              <AlbumCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourPostPage;
