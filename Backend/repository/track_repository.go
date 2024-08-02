package repository

import (
	"github.com/TazkieCT/njotify/model"
)

type TrackRepository interface {
	CreateMusic(music model.Track)
	GetTrackByAlbum(id string) []model.Track
	GetTrackByPlaylist(id string) []model.GetPlaylistTrack
	GetTrackByArtist(id string) []model.GetArtistTrack
	GetTrackById(id string) model.Track
	GetAllTracks() []model.Track
}
