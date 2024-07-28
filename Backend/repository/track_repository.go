package repository

import (
	"github.com/TazkieCT/njotify/model"
)

type TrackRepository interface {
	CreateMusic(music model.Track)
	GetTrackByAlbum(id string) []model.Track
}
