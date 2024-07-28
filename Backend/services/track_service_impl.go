package services

import (
	"github.com/TazkieCT/njotify/data/response"
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"github.com/TazkieCT/njotify/repository"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type TrackServiceImpl struct {
	TrackRepository repository.TrackRepository
	Validate        *validator.Validate
}

func NewTrackServiceImpl(trackRepository repository.TrackRepository, validate *validator.Validate) TrackService {
	return &TrackServiceImpl{
		TrackRepository: trackRepository,
		Validate:        validate,
	}
}

func (c *TrackServiceImpl) CreateMusic(album_id uuid.UUID, name string, filePath string) {
	musicId, err := uuid.NewRandom()
	helper.CheckPanic(err)

	musicModel := model.Track{
		Id:        musicId,
		AlbumId:   album_id,
		TrackName: name,
		TrackFile: filePath,
	}

	c.TrackRepository.CreateMusic(musicModel)
}

func (r *TrackServiceImpl) GetTrackByAlbum(album_id string) []response.TrackAlbum {
	tracks := r.TrackRepository.GetTrackByAlbum(album_id)

	var trackAlbums []response.TrackAlbum
	for _, track := range tracks {
		trackAlbum := response.TrackAlbum{
			Id:     track.Id.String(),
			Artist: track.Album.Artist.User.Username,
			Name:   track.TrackName,
			File:   track.TrackFile,
			Album:  track.Album.AlbumName,
			Image:  track.Album.AlbumImage,
		}
		trackAlbums = append(trackAlbums, trackAlbum)
	}

	return trackAlbums
}
