import style from "../../styles/page/HomePage.module.css";
import GalleryCard from "../../components/widget/GalleryCard";
import AlbumCard from "../../components/widget/AlbumCard";
import AlbumCardSkeleton from "../../components/widget/AlbumCardSkeleton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import useUserStore from "../../state/AccountState";
import axios from "axios";
import Cookies from 'js-cookie';
import useCookie from "../../state/CookieState";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [albums, setAlbums] = useState<albumCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isShowingSkeleton, setIsShowingSkeleton] = useState<boolean>(false);
  const [delayTimeout, setDelayTimeout] = useState<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { cookie, setCookie } = useCookie();

  const getCookie = () => {
    const token = Cookies.get('token');
      if (token) {
        setCookie(token);
      } else {
        console.error("Token not found in cookies.");
      }
  };

  useEffect(() => {
    getCookie();
  }, []);

  const fetchAlbums = useCallback(async (page: number) => {
    setIsFetching(true);
    try {
      // const payload = { token: token };
      // const response = await axios.get(`http://localhost:8888/get-all-album?page=${page}`, {
      //   headers: {
      //     Authorization: `${cookie}`,
      //     withCredentials: true
      //   }
      // });
      const response = await axios.get(`http://localhost:8888/get-all-album?page=${page}`);
      const newAlbums = response.data.data;
      setAlbums(prev => [...prev, ...newAlbums]);
      setHasMore(newAlbums.length > 0);
    } catch (error) {
      console.error("Error fetching albums!", error);
    } finally {
      setLoading(false);
      setIsFetching(false);
      setIsShowingSkeleton(false);
    }
  }, []);

  useEffect(() => {
    fetchAlbums(page);
  }, [page, fetchAlbums]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollHeight - (scrollTop + clientHeight) < 10 && hasMore && !isFetching) {
        if (delayTimeout) {
          clearTimeout(delayTimeout);
        }

        setIsShowingSkeleton(true);

        const newTimeout = setTimeout(() => {
          setPage(prevPage => prevPage + 1);
        }, 500);

        setDelayTimeout(newTimeout);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (delayTimeout) {
        clearTimeout(delayTimeout);
      }
    };
  }, [hasMore, isFetching, delayTimeout]);

  return (
    <div className={style.container}>
      <div className={style.content} ref={containerRef}>
        <div className={style.gallery}>
          <GalleryCard />
        </div>
        <div className={style.section}>
          <div className={style["flex-between"]}>
            <span className={style.header}>Recently Played</span>
            <span className={style.link} onClick={() => navigate("/showmore?type=recent-album")}>Show all</span>
          </div>
          <div className={style.flex}>
            {/* {albums.length === 0 && loading
              ? Array.from({ length: 6 }).map((_, index) => <AlbumCardSkeleton key={index} />)
              : albums.map(album => <AlbumCard key={album.album_id} album={album} />)
            }
            {isShowingSkeleton && Array.from({ length: 6 }).map((_, index) => (
              <AlbumCardSkeleton key={`skeleton-${index}`} />
            ))} */}
          </div>
        </div>
        {/* <div className={style.section}>
          <div className={style["flex-between"]}>
            <span className={style.header}>Podcast</span>
            <span className={style.link}>Show all</span>
          </div>
          <div className={style.flex}>
            {albums.length === 0 && loading
              ? Array.from({ length: 6 }).map((_, index) => <AlbumCardSkeleton key={index} />)
              : albums.map(album => <AlbumCard key={album.album_id} album={album} />)
            }
            {isShowingSkeleton && Array.from({ length: 6 }).map((_, index) => (
              <AlbumCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        </div> */}
        <div className={style.section}>
          <div className={style["flex-between"]}>
            <span className={style.header}>Recommended For You</span>
            <span className={style.link} onClick={() => navigate("/showmore?type=album")}>Show all</span>
          </div>
          <div className={`${style.flex} ${style.wrap}`}>
            {albums.length === 0 && loading
              ? Array.from({ length: 6 }).map((_, index) => <AlbumCardSkeleton key={index} />)
              : albums.map(album => <AlbumCard album={album} />)
            }
            {isShowingSkeleton && Array.from({ length: 6 }).map((_, index) => (
              <AlbumCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
