import { IoSearch } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import style from "../../styles/layoutPage/LeftTab.module.css"
import { VscLibrary } from "react-icons/vsc";
import { FiPlus } from "react-icons/fi";
import { IoArrowForward } from "react-icons/io5";
import { LuList } from "react-icons/lu";
import usePageStore from "../../state/PageState";
import PlaylistItem from "../widget/PlaylistItem";
import { PiMusicNotesSimpleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../state/AccountState";
import { useEffect, useState } from "react";
import Modal from "../widget/Modal";
import axios from "axios";

const LeftTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const page = usePageStore((state) => state.page)
  const changePage = usePageStore((state) => state.changePage)
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [playlists, setPlaylists] = useState<playlist[]>([]);

  const fetchPlaylist = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/get-playlist-user/${user.Id}`);
      setPlaylists(response.data.data);
      // console.log(playlists);
    } catch (error) {
      console.error("Error fetching playlist!", error);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [user.Id]);

  const handleSave = async (title: string, description: string) => {
    // console.log('Title:', title);
    // console.log('Description:', description);

    console.log(user);
    const data = {
      user_id: user.Id,
      playlist_name: title,
      playlist_desc: description,
    };
  
    try {
      const response = await axios.post("http://localhost:8888/create-playlist", data);
      console.log(response)
      fetchPlaylist();
    } catch (error) {
      if (error) {
        console.error("Response error:", error);
      }
    }
  };

  return (
    <>
      <div className={style.container}>
      <div className={style.navigation}>
        <a className={`${style.links} ${page === "home" ? (style.active) : ("")}`} onClick={() => {changePage("home"); navigate("/home")}}><span className={style.big}><GoHome /></span> Home</a>
        <a className={`${style.links} ${(page === "search" || page === "result") ? (style.active) : ("")}`} onClick={() => {changePage("search"); navigate("/search")}}><span className={style.big}><IoSearch /></span> Search</a>
        {user.Role === "artist" && (
          <a className={`${style.links} ${(page === "post") ? (style.active) : ("")}`} onClick={() => {changePage("post"); navigate("/post")}}><span className={style.big}><PiMusicNotesSimpleFill /></span> Your Music</a>
        )}
      </div>
      <div className={style.library}>
        <div className={style['flex-between']}>  
          <a className={style.links}><span className={style.big}><VscLibrary /></span>Your Library</a>
          <a className={style['lib-button']}>
            <span className={style.medium} onClick={() => setIsModalOpen(true)}><FiPlus/></span>
            <span className={style.medium}><IoArrowForward/></span>
          </a>
        </div>
        <div className={style.album}>
          <div className={`${style['flex-between']} ${style['mb-10']}`}>
            <a className={style.medium}><IoSearch /></a>
            <a className={style.recent}>Recents<span className={style.medium}><LuList/></span></a>
          </div>
          {playlists && playlists.map(playlists => (
            <PlaylistItem key={playlists.playlist_id} playlist={playlists}/>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
      </div>
    </>
  )
}

export default LeftTab