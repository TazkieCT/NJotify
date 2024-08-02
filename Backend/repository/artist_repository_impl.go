package repository

import (
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"github.com/go-redis/redis"
	"gorm.io/gorm"
)

type ArtistRepositoryImpl struct {
	Db    *gorm.DB
	Redis *redis.Client
}

func NewArtistRepositoryImpl(db *gorm.DB, redis *redis.Client) ArtistRepository {
	return &ArtistRepositoryImpl{Db: db, Redis: redis}
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

func (r *ArtistRepositoryImpl) GetAllArtist() []model.Artist {
	var artists []model.Artist
	result := r.Db.Preload("User").Find(&artists)
	helper.CheckPanic(result.Error)
	return artists
}
