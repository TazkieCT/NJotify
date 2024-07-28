package repository

import (
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"gorm.io/gorm"
)

type TrackRepositoryImpl struct {
	Db *gorm.DB
}

func NewTrackRepositoryImpl(db *gorm.DB) TrackRepository {
	return &TrackRepositoryImpl{Db: db}
}
func (c *TrackRepositoryImpl) CreateMusic(music model.Track) {
	result := c.Db.Create(&music)
	helper.CheckPanic(result.Error)
}

func (r *TrackRepositoryImpl) GetTrackByAlbum(id string) []model.Track {
	var tracks []model.Track
	result := r.Db.
		Preload("Album").
		Preload("Album.Artist").
		Preload("Album.Artist.User").
		Where("album_id = ?", id).
		Find(&tracks)
	helper.CheckPanic(result.Error)

	return tracks
}
