package repository

import (
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"github.com/go-redis/redis"
	"gorm.io/gorm"
)

type AlbumRepositoryImpl struct {
	Db    *gorm.DB
	Redis *redis.Client
}

func NewAlbumRepositoryImpl(db *gorm.DB, redis *redis.Client) AlbumRepository {
	return &AlbumRepositoryImpl{Db: db, Redis: redis}
}

func (c *AlbumRepositoryImpl) CreateAlbum(album model.Album) {
	result := c.Db.Create(&album)
	helper.CheckPanic(result.Error)
}

func (c *AlbumRepositoryImpl) CreateMusic(music model.Track) {
	result := c.Db.Create(&music)
	helper.CheckPanic(result.Error)
}

func (r *AlbumRepositoryImpl) GetAlbumByArtist(id string) []model.Album {
	var albums []model.Album
	result := r.Db.Where("artist_id = ?", id).Preload("Artist").Preload("Artist.User").Find(&albums)
	helper.CheckPanic(result.Error)
	return albums
}

func (r *AlbumRepositoryImpl) GetAllAlbum() []model.Album {
	var albums []model.Album
	result := r.Db.Preload("Artist").Preload("Artist.User").Find(&albums)
	helper.CheckPanic(result.Error)
	return albums
}

func (r *AlbumRepositoryImpl) GetAlbumById(id string) model.Album {
	var album model.Album
	result := r.Db.Where("id = ?", id).Preload("Artist").Preload("Artist.User").First(&album)
	helper.CheckPanic(result.Error)
	return album
}

func (r *AlbumRepositoryImpl) GetAlbumByTrack(id string) model.Album {
	var track model.Track
	result := r.Db.Preload("Album").Where("id = ?", id).First(&track)
	helper.CheckPanic(result.Error)
	return track.Album
}

func (r *AlbumRepositoryImpl) GetAnotherAlbum(id string) []model.Album {
	var albums []model.Album

	var artistUserID string
	subQuery := r.Db.Model(&model.Album{}).Select("artists.user_id").
		Joins("JOIN artists ON artists.user_id = albums.artist_id").
		Where("albums.id = ?", id).
		Scan(&artistUserID)
	helper.CheckPanic(subQuery.Error)

	result := r.Db.Preload("Artist").Preload("Tracks").
		Where("albums.id != ? AND albums.artist_id IN (?)", id,
			r.Db.Table("artists").Select("artists.user_id").Where("artists.user_id = ?", artistUserID)).
		Find(&albums)
	helper.CheckPanic(result.Error)

	return albums
}
