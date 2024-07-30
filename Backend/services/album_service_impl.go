package services

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/data/response"
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"github.com/TazkieCT/njotify/repository"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type AlbumServiceImpl struct {
	AlbumRepository repository.AlbumRepository
	Validate        *validator.Validate
}

func NewAlbumServiceImpl(albumRepository repository.AlbumRepository, validate *validator.Validate) AlbumService {
	return &AlbumServiceImpl{
		AlbumRepository: albumRepository,
		Validate:        validate,
	}
}

func (c *AlbumServiceImpl) CreateAlbum(album request.CreateAlbumRequest) uuid.UUID {
	err := c.Validate.Struct(album)
	helper.CheckPanic(err)

	artistId, err := uuid.Parse(album.Artist)
	helper.CheckPanic(err)

	albumId, err := uuid.NewRandom()
	helper.CheckPanic(err)

	imagePath, err := SavePicture("./public/image/", album.Image, album.Artist)
	helper.CheckPanic(err)

	albumModel := model.Album{
		Id:         albumId,
		ArtistId:   artistId,
		AlbumName:  album.Name,
		AlbumType:  album.Type,
		AlbumImage: imagePath,
	}

	c.AlbumRepository.CreateAlbum(albumModel)

	return albumId
}

func (c *AlbumServiceImpl) CreateMusic(album_id uuid.UUID, name string, filePath string) {
	musicId, err := uuid.NewRandom()
	helper.CheckPanic(err)

	musicModel := model.Track{
		Id:        musicId,
		AlbumId:   album_id,
		TrackName: name,
		TrackFile: filePath,
	}

	c.AlbumRepository.CreateMusic(musicModel)
}

func (r *AlbumServiceImpl) GetAlbumByArtist(id string) []response.AlbumCard {
	albums := r.AlbumRepository.GetAlbumByArtist(id)

	var albumCards []response.AlbumCard
	for _, album := range albums {
		albumCard := response.AlbumCard{
			Id:        album.Id.String(),
			Artist:    album.Artist.User.Username,
			Name:      album.AlbumName,
			Type:      album.AlbumType,
			Image:     album.AlbumImage,
			CreatedAt: album.CreatedAt.String(),
		}
		albumCards = append(albumCards, albumCard)
	}

	return albumCards
}

func (r *AlbumServiceImpl) GetAllAlbum() []response.AlbumCard {
	albums := r.AlbumRepository.GetAllAlbum()

	var albumCards []response.AlbumCard
	for _, album := range albums {
		albumCard := response.AlbumCard{
			Id:        album.Id.String(),
			Artist:    album.Artist.User.Username,
			Name:      album.AlbumName,
			Type:      album.AlbumType,
			Image:     album.AlbumImage,
			CreatedAt: album.CreatedAt.String(),
		}
		albumCards = append(albumCards, albumCard)
	}

	return albumCards
}

func (r *AlbumServiceImpl) GetAlbumById(id string) response.AlbumCard {
	album := r.AlbumRepository.GetAlbumById(id)

	albumCard := response.AlbumCard{
		Id:        album.Id.String(),
		Artist:    album.Artist.User.Username,
		Name:      album.AlbumName,
		Type:      album.AlbumType,
		Image:     album.AlbumImage,
		CreatedAt: album.CreatedAt.String(),
	}

	return albumCard
}
