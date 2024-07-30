package repository

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/model"
)

type PlaylistRepository interface {
	CreatePlaylist(playlist model.Playlist)
	GetPlaylistByUser(id string) []model.Playlist
	GetPlaylistById(id string) model.Playlist
	AddTrackToPlaylist(playlistTrack model.PlaylistTrack)
	DeletePlaylistTrack(trackPlaylist request.TrackToPlaylist)
	GetPlaylistsByArtist(artistId string) []model.Playlist
}
