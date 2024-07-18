import style from "../../styles/page/ProfilePage.module.css"
import usePageStore from "../../state/page"

const ProfilePage = () => {
  const changePage = usePageStore((state) => state.changePage)
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
          <button onClick={(e) => {
            e.preventDefault();
            changePage("home");
          }}>Back Home Page</button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage