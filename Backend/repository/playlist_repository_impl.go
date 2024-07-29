package repository

import (
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"gorm.io/gorm"
)

type PlaylistRepositoryImpl struct {
	Db *gorm.DB
}

func NewPlaylistRepositoryImpl(db *gorm.DB) PlaylistRepository {
	return &PlaylistRepositoryImpl{Db: db}
}

func (c *PlaylistRepositoryImpl) CreatePlaylist(playlist model.Playlist) {
	result := c.Db.Create(&playlist)
	helper.CheckPanic(result.Error)
}

func (r *PlaylistRepositoryImpl) GetPlaylistByUser(id string) []model.Playlist {
	var playlists []model.Playlist
	result := r.Db.Where("user_id = ?", id).Preload("User").Find(&playlists)
	helper.CheckPanic(result.Error)
	return playlists
}

func (r *PlaylistRepositoryImpl) GetPlaylistById(id string) model.Playlist {
	var playlist model.Playlist
	result := r.Db.Where("id = ?", id).Preload("User").Find(&playlist)
	helper.CheckPanic(result.Error)
	return playlist
}

func (c *PlaylistRepositoryImpl) AddTrackToPlaylist(playlistTrack model.PlaylistTrack) {
	result := c.Db.Create(&playlistTrack)
	helper.CheckPanic(result.Error)
}
