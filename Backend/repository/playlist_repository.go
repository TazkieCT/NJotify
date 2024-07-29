package repository

import "github.com/TazkieCT/njotify/model"

type PlaylistRepository interface {
	CreatePlaylist(playlist model.Playlist)
}
