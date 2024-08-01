package services

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/data/response"
)

type PlaylistService interface {
	CreatePlaylist(playlist request.CreatePlaylistRequest)
	GetPlaylistByUser(id string) []response.PlaylistUser
	GetPlaylistById(id string) response.PlaylistUser
	AddTrackToPlaylist(trackPlaylist request.TrackToPlaylist)
	RemoveTrackToPlaylist(trackPlaylist request.TrackToPlaylist)
	GetPlaylistsByArtist(id string) []response.PlaylistUser
	DeletePlaylist(id string)
}
