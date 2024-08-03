import { useEffect, useState } from "react";
import AlbumCard from "../../components/widget/AlbumCard";
import ArtistCard from "../../components/widget/ArtistCard";
import TopSearch from "../../components/widget/TopSearch";
import useSearchStore from "../../state/SearchState";
import style from "../../styles/page/SearchPage.module.css";
import axios from "axios";

interface TrackTopResult {
  type: 'track';
  track_name: string;
  track_image: string;
  track_artist: string;
}

interface UserTopResult {
  type: 'user';
  user_name: string;
  profile_image: string;
  user_role: string;
}

interface AlbumTopResult {
  type: 'album';
  album_name: string;
  album_image: string;
  artist_name: string;
  album_date: string;
}

interface PlaylistTopResult {
  type: 'playlist';
  playlist_name: string;
  playlist_image: string;
}

type TopResult = TrackTopResult | UserTopResult | AlbumTopResult | PlaylistTopResult | null;


const ResultSearchPage = () => {
  const { search } = useSearchStore();
  const [result, setResult] = useState({
    type: '',
    track: [],
    user: [],
    album: [],
    playlist: [],
  });
  const [topResult, setTopResult] = useState<TopResult>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/search/${search}`);
        const data = response.data.data || {
          type: '',
          track: [],
          user: [],
          album: [],
          playlist: [],
        };
        setResult(data);

        let top: TopResult = null;
        
        if (data.track && data.type === "track" && data.track.length > 0) {
          top = { type: 'track', ...data.track[0] };
        } else if (data.user && data.type === "artist" && data.user.length > 0) {
          top = { type: 'user', ...data.user[0] };
        } else if (data.album && data.type === "album" && data.album.length > 0) {
          top = { type: 'album', ...data.album[0] };
        } else if (data.playlist && data.type === "playlist" && data.playlist.length > 0) {
          top = { type: 'playlist', ...data.playlist[0] };
        }
        setTopResult(top);
        console.log( response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
        setResult({
          type: '',
          track: [],
          user: [],
          album: [],
          playlist: [],
        });
        setTopResult(null);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className={style.container}>
      <div className={style.content}>
        {result && (
          <>
            <div className={`${style['result']} ${style['flex']}`}>
              <div className={`${style['top-result']} ${style['gap-result']}`}>
                {topResult && (
                  <>
                    <span className={style.header}>Top Results</span>
                    <div className={style['highlight-song']}>
                      <div className={style['highlight-image']}>
                        <img src={`http://localhost:8888/${topResult.track_image || topResult.profile_image || topResult.album_image || topResult.playlist_image}`} className={style['top-image']} alt="" />
                      </div>
                      <div className={`highlight-text`}>
                        <span className={style['highlight-title']}>
                          {'track_name' in topResult ? topResult.track_name :
                          'user_name' in topResult ? topResult.user_name :
                          'album_name' in topResult ? topResult.album_name :
                          'playlist_name' in topResult ? topResult.playlist_name : ''}
                        </span>
                        <span className={style['highlight-subtitle']}>
                          {'track_artist' in topResult ? `Artist · ${topResult.track_artist}` :
                          'user_role' in topResult ? `Role · ${topResult.user_role}` :
                          'artist_name' in topResult ? `Artist · ${topResult.artist_name}` :
                          topResult.type === 'playlist' ? `Playlist` : ''}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {result.track && (
                <div className={style['songs-result']}>
                  <span className={style.header}>Songs</span>
                  <div className={style['top-songs']}>
                    {result.track?.map((track, index) => (
                      <TopSearch key={index} track={track} />
                    ))}
                  </div>
                </div>
              )}
            </div>
            {result.user && (
              <div className={style['artist']}>
                <span className={style.header}>Artist</span>
                <div className={style.flex}>
                  {result.user?.map((user, index) => (
                    <ArtistCard key={index} user={user} />
                  ))}
                </div>
              </div>
            )}
            {result.album && (
              <div className={style['browse']}>
                <span className={style.header}>Collections</span>
                <div className={style.flex}>
                  {result.album.map((album, index) => (
                    <AlbumCard key={index} album={album} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        {result.type === "" && (
          <div className={style['highlight-title']}>Result Not Found</div>
        )}
      </div>
    </div>
  );
}

export default ResultSearchPage;
