package services

import (
	"github.com/TazkieCT/njotify/data/request"
)

type PlaylistService interface {
	CreatePlaylist(playlist request.CreatePlaylistRequest)
}
