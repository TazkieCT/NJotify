package repository

import (
	"encoding/json"
	"time"

	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"github.com/go-redis/redis"
	"gorm.io/gorm"
)

type PlaylistRepositoryImpl struct {
	Db    *gorm.DB
	Redis *redis.Client
}

func NewPlaylistRepositoryImpl(db *gorm.DB, redis *redis.Client) PlaylistRepository {
	return &PlaylistRepositoryImpl{Db: db, Redis: redis}
}

func (c *PlaylistRepositoryImpl) CreatePlaylist(playlist model.Playlist) {
	result := c.Db.Create(&playlist)
	helper.CheckPanic(result.Error)
}

func (r *PlaylistRepositoryImpl) GetPlaylistByUser(id string) []model.Playlist {
	var playlists []model.Playlist
	cacheKey := "user_playlists:" + id

	cachedData, err := r.Redis.Get(cacheKey).Result()
	if err == redis.Nil {
		result := r.Db.Where("user_id = ?", id).Preload("User").Find(&playlists)
		helper.CheckPanic(result.Error)

		serialized, err := json.Marshal(playlists)
		helper.CheckPanic(err)
		r.Redis.Set(cacheKey, serialized, 5*time.Minute).Err()
	} else if err != nil {
		helper.CheckPanic(err)
	} else {
		err := json.Unmarshal([]byte(cachedData), &playlists)
		helper.CheckPanic(err)
	}

	return playlists
}

func (r *PlaylistRepositoryImpl) GetPlaylistById(id string) model.Playlist {
	var playlist model.Playlist
	cacheKey := "playlist:" + id

	cachedData, err := r.Redis.Get(cacheKey).Result()
	if err == redis.Nil {
		result := r.Db.Where("id = ?", id).Preload("User").Find(&playlist)
		helper.CheckPanic(result.Error)

		serialized, err := json.Marshal(playlist)
		helper.CheckPanic(err)
		r.Redis.Set(cacheKey, serialized, 5*time.Minute).Err()
	} else if err != nil {
		helper.CheckPanic(err)
	} else {
		err := json.Unmarshal([]byte(cachedData), &playlist)
		helper.CheckPanic(err)
	}

	return playlist
}

func (c *PlaylistRepositoryImpl) AddTrackToPlaylist(playlistTrack model.PlaylistTrack) {
	result := c.Db.Create(&playlistTrack)
	helper.CheckPanic(result.Error)

	c.Redis.Del("playlist:" + playlistTrack.PlaylistId.String())
	var playlist model.Playlist
	c.Db.Where("id = ?", playlistTrack.PlaylistId).First(&playlist)
	c.Redis.Del("user_playlists:" + playlist.UserId.String())
}

func (r *PlaylistRepositoryImpl) DeletePlaylistTrack(trackPlaylist request.TrackToPlaylist) {
	var playlistTrack model.PlaylistTrack
	result := r.Db.Where("playlist_id = ? AND track_id = ?", trackPlaylist.Playlist, trackPlaylist.Track).Delete(&playlistTrack)
	helper.CheckPanic(result.Error)

	r.Redis.Del("playlist:" + trackPlaylist.Playlist)

	var playlist model.Playlist
	r.Db.Where("id = ?", trackPlaylist.Playlist).First(&playlist)
	r.Redis.Del("user_playlists:" + playlist.UserId.String())
}

func (r *PlaylistRepositoryImpl) GetPlaylistsByArtist(artistId string) []model.Playlist {
	var playlists []model.Playlist
	cacheKey := "artist_playlists:" + artistId

	cachedData, err := r.Redis.Get(cacheKey).Result()
	if err == redis.Nil {
		result := r.Db.Table("playlists").
			Joins("JOIN playlist_tracks ON playlists.id = playlist_tracks.playlist_id").
			Joins("JOIN tracks ON playlist_tracks.track_id = tracks.id").
			Joins("JOIN albums ON tracks.album_id = albums.id").
			Where("albums.artist_id = ?", artistId).
			Group("playlists.id").
			Find(&playlists)
		helper.CheckPanic(result.Error)

		serialized, err := json.Marshal(playlists)
		helper.CheckPanic(err)
		r.Redis.Set(cacheKey, serialized, 5*time.Minute).Err()
	} else if err != nil {
		helper.CheckPanic(err)
	} else {
		err := json.Unmarshal([]byte(cachedData), &playlists)
		helper.CheckPanic(err)
	}

	return playlists
}

func (d *PlaylistRepositoryImpl) DeletePlaylist(id string) {
	var playlist model.Playlist
	result := d.Db.Delete(&playlist, "id = ?", id)
	helper.CheckPanic(result.Error)

	d.Redis.Del("playlist:" + id)
}

func (r *PlaylistRepositoryImpl) GetAllPlaylist() []model.Playlist {
	var playlists []model.Playlist
	result := r.Db.Find(&playlists)
	helper.CheckPanic(result.Error)
	return playlists
}
