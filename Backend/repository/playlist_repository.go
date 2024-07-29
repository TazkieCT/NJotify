package repository

import "github.com/TazkieCT/njotify/model"

type PlaylistRepository interface {
	CreatePlaylist(playlist model.Playlist)
	GetPlaylistByUser(id string) []model.Playlist
	GetPlaylistById(id string) model.Playlist
	AddTrackToPlaylist(playlistTrack model.PlaylistTrack)
}
