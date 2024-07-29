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

func (r *PlaylistServiceImpl) GetPlaylistByUser(id string) []response.PlaylistUser {
	playlists := r.PlaylistRepository.GetPlaylistByUser(id)

	var playlistUsers []response.PlaylistUser
	for _, playlist := range playlists {
		playlistUser := response.PlaylistUser{
			Id:    playlist.Id.String(),
			User:  playlist.User.Username,
			Name:  playlist.PlaylistName,
			Image: playlist.PlaylistImage,
			Desc:  playlist.PlaylistDesc,
		}
		playlistUsers = append(playlistUsers, playlistUser)
	}

	return playlistUsers
}

func (r *PlaylistServiceImpl) GetPlaylistById(id string) response.PlaylistUser {
	playlist := r.PlaylistRepository.GetPlaylistById(id)

	playlistUser := response.PlaylistUser{
		Id:    playlist.Id.String(),
		User:  playlist.User.Username,
		Name:  playlist.PlaylistName,
		Image: playlist.PlaylistImage,
		Desc:  playlist.PlaylistDesc,
	}

	return playlistUser
}

func (c *PlaylistServiceImpl) AddTrackToPlaylist(trackPlaylist request.AddTrackToPlaylist) {
	err := c.Validate.Struct(trackPlaylist)
	helper.CheckPanic(err)

	trackId, err := uuid.Parse(trackPlaylist.Track)
	helper.CheckPanic(err)

	playlistId, err := uuid.Parse(trackPlaylist.Playlist)
	helper.CheckPanic(err)

	playlistTrackModel := model.PlaylistTrack{
		PlaylistId: playlistId,
		TrackId:    trackId,
	}

	c.PlaylistRepository.AddTrackToPlaylist(playlistTrackModel)
}
