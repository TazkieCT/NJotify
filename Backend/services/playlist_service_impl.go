package services

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"github.com/TazkieCT/njotify/repository"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type PlaylistServiceImpl struct {
	PlaylistRepository repository.PlaylistRepository
	Validate           *validator.Validate
}

func NewPlaylistServiceImpl(playlistRepository repository.PlaylistRepository, validate *validator.Validate) PlaylistService {
	return &PlaylistServiceImpl{
		PlaylistRepository: playlistRepository,
		Validate:           validate,
	}
}

func (c *PlaylistServiceImpl) CreatePlaylist(playlist request.CreatePlaylistRequest) {
	err := c.Validate.Struct(playlist)
	helper.CheckPanic(err)

	userId, err := uuid.Parse(playlist.UserId)
	helper.CheckPanic(err)

	playlistId, err := uuid.NewRandom()
	helper.CheckPanic(err)

	playlistModel := model.Playlist{
		Id:           playlistId,
		UserId:       userId,
		PlaylistName: playlist.Name,
		PlaylistDesc: playlist.Desc,
	}

	c.PlaylistRepository.CreatePlaylist(playlistModel)
}
