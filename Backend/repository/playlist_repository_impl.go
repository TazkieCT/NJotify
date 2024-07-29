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
