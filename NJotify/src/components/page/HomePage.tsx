import style from "../../styles/Page/HomePage.module.css"
import usePageStore from "../../state/page";

const MainTab = () => {
  const changePage = usePageStore((state) => state.changePage)
  return (
    <div className={style.container}>
      <div className={style.content}>
        <button onClick={(e) => {
          e.preventDefault();
          changePage("track");
        }}>Move</button>
      </div>
    </div>
  )
}

export default MainTab