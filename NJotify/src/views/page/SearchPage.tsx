import style from "../../styles/Page/ShowMorePage.module.css"

const SearchPage = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
            <span className={style.title}>Music</span>
        </div>
        <div className={style.section}>
          <div className={style["flex-between"]}>
            <span className={style.subtitle}>Latest Music</span>
          </div>
          <div className={style.flex}>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage