package repository

import (
	"github.com/TazkieCT/njotify/model"
)

type AlbumRepository interface {
	CreateAlbum(album model.Album)
	CreateMusic(music model.Track)
	GetAllAlbum() []model.Album
	GetAlbumByArtist(id string) []model.Album
	GetAlbumById(id string) model.Album
	GetAlbumByTrack(id string) model.Album
	GetAnotherAlbum(id string) []model.Album
}
