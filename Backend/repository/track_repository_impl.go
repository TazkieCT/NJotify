package repository

import (
	"encoding/json"
	"time"

	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"github.com/go-redis/redis"
	"gorm.io/gorm"
)

type TrackRepositoryImpl struct {
	Db    *gorm.DB
	Redis *redis.Client
}

func NewTrackRepositoryImpl(db *gorm.DB, redis *redis.Client) TrackRepository {
	return &TrackRepositoryImpl{Db: db, Redis: redis}
}

func (c *TrackRepositoryImpl) CreateMusic(music model.Track) {
	result := c.Db.Create(&music)
	helper.CheckPanic(result.Error)
}

func (r *TrackRepositoryImpl) GetTrackByAlbum(id string) []model.Track {
	var tracks []model.Track
	cacheKey := "album_tracks:" + id

	cachedData, err := r.Redis.Get(cacheKey).Result()
	if err == redis.Nil {
		result := r.Db.
			Preload("Album").
			Preload("Album.Artist").
			Preload("Album.Artist.User").
			Where("album_id = ?", id).
			Find(&tracks)
		helper.CheckPanic(result.Error)

		serialized, err := json.Marshal(tracks)
		helper.CheckPanic(err)
		r.Redis.Set(cacheKey, serialized, 5*time.Minute).Err()
	} else if err != nil {
		helper.CheckPanic(err)
	} else {
		err := json.Unmarshal([]byte(cachedData), &tracks)
		helper.CheckPanic(err)
	}

	return tracks
}

func (r *TrackRepositoryImpl) GetTrackByPlaylist(playlistId string) []model.GetPlaylistTrack {
	var result []model.GetPlaylistTrack
	cacheKey := "playlist_tracks:" + playlistId

	cachedData, err := r.Redis.Get(cacheKey).Result()
	if err == redis.Nil {
		r.Db.Table("tracks").
			Select("tracks.id AS id_track, users.username AS artist_name, tracks.track_name, albums.album_name, albums.album_image, tracks.track_file, playlist_tracks.added_at AS added_at_playlist_track, tracks.duration, tracks.listen_count").
			Joins("JOIN playlist_tracks ON playlist_tracks.track_id = tracks.id").
			Joins("JOIN albums ON albums.id = tracks.album_id").
			Joins("JOIN artists ON artists.user_id = albums.artist_id").
			Joins("JOIN users ON users.id = albums.artist_id").
			Where("playlist_tracks.playlist_id = ?", playlistId).
			Scan(&result)

		serialized, err := json.Marshal(result)
		helper.CheckPanic(err)
		r.Redis.Set(cacheKey, serialized, 5*time.Minute).Err()
	} else if err != nil {
		helper.CheckPanic(err)
	} else {
		err := json.Unmarshal([]byte(cachedData), &result)
		helper.CheckPanic(err)
	}

	return result
}

func (r *TrackRepositoryImpl) GetTrackByArtist(artistId string) []model.GetArtistTrack {
	var result []model.GetArtistTrack
	cacheKey := "artist_tracks:" + artistId

	cachedData, err := r.Redis.Get(cacheKey).Result()
	if err == redis.Nil {
		r.Db.Table("tracks").
			Select("DISTINCT tracks.id AS id_track, tracks.track_name, albums.album_image, tracks.track_file, tracks.duration, tracks.listen_count").
			Joins("JOIN albums ON albums.id = tracks.album_id").
			Joins("JOIN artists ON artists.user_id = albums.artist_id").
			Joins("JOIN users ON users.id = albums.artist_id").
			Where("artists.user_id = ?", artistId).
			Scan(&result)

		serialized, err := json.Marshal(result)
		helper.CheckPanic(err)
		r.Redis.Set(cacheKey, serialized, 5*time.Minute).Err()
	} else if err != nil {
		helper.CheckPanic(err)
	} else {
		err := json.Unmarshal([]byte(cachedData), &result)
		helper.CheckPanic(err)
	}

	return result
}

func (r *TrackRepositoryImpl) GetTrackById(id string) model.Track {
	var track model.Track
	cacheKey := "track:" + id

	cachedData, err := r.Redis.Get(cacheKey).Result()
	if err == redis.Nil {
		result := r.Db.Preload("Album").First(&track, "id = ?", id)
		helper.CheckPanic(result.Error)

		serialized, err := json.Marshal(track)
		helper.CheckPanic(err)
		r.Redis.Set(cacheKey, serialized, 5*time.Minute).Err()
	} else if err != nil {
		helper.CheckPanic(err)
	} else {
		err := json.Unmarshal([]byte(cachedData), &track)
		helper.CheckPanic(err)
	}

	return track
}

func (r *TrackRepositoryImpl) GetAllTracks() []model.Track {
	var tracks []model.Track
	cacheKey := "all_tracks"

	cachedData, err := r.Redis.Get(cacheKey).Result()
	if err == redis.Nil {
		result := r.Db.Preload("Album").
			Preload("Album.Artist").
			Preload("Album.Artist.User").
			Find(&tracks)
		helper.CheckPanic(result.Error)

		serialized, err := json.Marshal(tracks)
		helper.CheckPanic(err)
		r.Redis.Set(cacheKey, serialized, 5*time.Minute).Err()
	} else if err != nil {
		helper.CheckPanic(err)
	} else {
		err := json.Unmarshal([]byte(cachedData), &tracks)
		helper.CheckPanic(err)
	}

	return tracks
}

func (r *TrackRepositoryImpl) AddTrackToQueue(queueKey string, track model.Track) {
	serialized, err := json.Marshal(track)
	helper.CheckPanic(err)

	err = r.Redis.RPush(queueKey, serialized).Err()
	helper.CheckPanic(err)
}

func (r *TrackRepositoryImpl) RemoveTrackFromQueue(queueKey string, trackId string) {
	tracks := r.GetQueue(queueKey)

	for index, track := range tracks {
		if track.Id.String() == trackId {
			tracks = append(tracks[:index], tracks[index+1:]...)
			break
		}
	}

	r.Redis.Del(queueKey)

	for _, track := range tracks {
		serialized, err := json.Marshal(track)
		helper.CheckPanic(err)

		err = r.Redis.RPush(queueKey, serialized).Err()
		helper.CheckPanic(err)
	}
}

func (r *TrackRepositoryImpl) GetQueue(queueKey string) []model.Track {
	var tracks []model.Track

	cachedData, err := r.Redis.LRange(queueKey, 0, -1).Result()
	helper.CheckPanic(err)

	for _, item := range cachedData {
		var track model.Track
		err := json.Unmarshal([]byte(item), &track)
		helper.CheckPanic(err)
		tracks = append(tracks, track)
	}

	return tracks
}

func (r *TrackRepositoryImpl) ResetQueue(queueKey string) {
	err := r.Redis.Del(queueKey).Err()
	helper.CheckPanic(err)
}

func (r *TrackRepositoryImpl) ListenCount(songId string) {
	var track model.Track

	result := r.Db.First(&track, "id = ?", songId)
	helper.CheckPanic(result.Error)

	track.ListenCount++

	updateResult := r.Db.Save(&track)
	if updateResult.Error != nil {
		helper.CheckPanic(updateResult.Error)
	}
}
