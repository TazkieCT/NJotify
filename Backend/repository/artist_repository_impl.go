package repository

import (
	"encoding/json"
	"time"

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

	artistData, err := r.Redis.Get(id).Result()
	if err == redis.Nil {
		result := r.Db.Preload("User").First(&artist, "user_id = ?", id)
		helper.CheckPanic(result.Error)

		artistJSON, err := json.Marshal(artist)
		helper.CheckPanic(err)
		r.Redis.Set(id, artistJSON, 24*time.Hour)
	} else if err != nil {
		helper.CheckPanic(err)
	} else {
		err = json.Unmarshal([]byte(artistData), &artist)
		helper.CheckPanic(err)
	}

	return artist
}

func (r *ArtistRepositoryImpl) GetArtistByTrack(id string) model.Artist {
	var track model.Track
	var artist model.Artist

	cacheKey := "track_artist_" + id
	artistData, err := r.Redis.Get(cacheKey).Result()
	if err == redis.Nil {
		result := r.Db.Preload("Album.Artist").Preload("Album.Artist.User").First(&track, "id = ?", id)
		helper.CheckPanic(result.Error)
		artist = track.Album.Artist

		artistJSON, err := json.Marshal(artist)
		helper.CheckPanic(err)
		r.Redis.Set(cacheKey, artistJSON, 24*time.Hour)
	} else if err != nil {
		helper.CheckPanic(err)
	} else {
		err = json.Unmarshal([]byte(artistData), &artist)
		helper.CheckPanic(err)
	}

	return artist
}

func (r *ArtistRepositoryImpl) GetAllArtist() []model.Artist {
	var artists []model.Artist
	result := r.Db.Preload("User").Find(&artists)
	helper.CheckPanic(result.Error)
	return artists
}
