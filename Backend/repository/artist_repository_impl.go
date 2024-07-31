package repository

import (
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"gorm.io/gorm"
)

type ArtistRepositoryImpl struct {
	Db *gorm.DB
}

func NewArtistRepositoryImpl(db *gorm.DB) ArtistRepository {
	return &ArtistRepositoryImpl{Db: db}
}

func (r *ArtistRepositoryImpl) GetArtist(id string) model.Artist {
	var artist model.Artist
	result := r.Db.Preload("User").First(&artist, "user_id = ?", id)
	helper.CheckPanic(result.Error)
	return artist
}

func (r *ArtistRepositoryImpl) GetArtistByTrack(id string) model.Artist {
	var track model.Track
	result := r.Db.Preload("Album.Artist").Preload("Album.Artist.User").First(&track, "id = ?", id)
	helper.CheckPanic(result.Error)
	return track.Album.Artist
}
