import useRightTabStore from "../../state/RightBarState"
import style from "../../styles/layoutPage/RightTab.module.css"
import Ads from "../widget/Ads"
import Queue from "../widget/Queue"
import SongDetail from "../widget/SongDetail"

const RightTab = () => {
  const { content } = useRightTabStore();

  return (
    <div className={style.container}>
      <div className={style['header-content']}>
        {content == "song-detail" && <SongDetail/>}
        {content == "ads" && <Ads/>}
        {content == "queue" && <Queue/>}
      </div>
    </div>
  )
}

export default RightTab