import usePageStore from "../../state/PageState";
import style from "../../styles/widget/AlbumCard.module.css"

const AlbumCard = () => {
  const changePage = usePageStore((state) => state.changePage)

  return (
    <div className={style["card"]} onClick={() => {changePage("track");}}>
      <img
        src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
        className={style["card-image"]}
        alt=""
      />
      <div className={style["card-text"]}>
        <span className={style["card-name"]}>The Weeknd</span>
        <span className={style["card-desc"]}>Los angeles I would Fkin die for you..</span>
      </div>
    </div>
  );
};

export default AlbumCard;
