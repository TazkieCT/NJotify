import style from "../../styles/widget/TopSearch.module.css"

const TopSearch = () => {
  return (
    <div className={`${style["flex-between"]} ${style["select"]}`}>
        <div className={style["song-info"]}>
            <img className={`${style["image-song"]}`} src="https://upload.wikimedia.org/wikipedia/id/thumb/c/c2/Radwimps_Your_Name_Album_Cover.jpg/220px-Radwimps_Your_Name_Album_Cover.jpg" alt=""/>
            <div className={style.col}>
                <span className={style["album-title"]}>Sparkle - movie ver.</span>
                <span className={style["album-subtitle"]}>RADWIMPS</span>
            </div>
        </div>
        <span>
            4:56
        </span>
    </div>
  );
};

export default TopSearch;
