package repository

import "github.com/TazkieCT/njotify/model"

type ArtistRepository interface {
	GetArtist(id string) model.Artist
	GetArtistByTrack(id string) model.Artist
}
