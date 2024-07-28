package services

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/data/response"
	"github.com/google/uuid"
)

type AlbumService interface {
	CreateAlbum(user request.CreateAlbumRequest) uuid.UUID
	CreateMusic(album_id uuid.UUID, name string, filePath string)
	GetAllAlbum() []response.AlbumCard
	GetAlbumById(id string) response.AlbumCard
	GetAlbumByArtist(id string) []response.AlbumCard
}
