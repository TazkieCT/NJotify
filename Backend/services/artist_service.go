package services

import "github.com/TazkieCT/njotify/data/response"

type ArtistService interface {
	GetArtist(id string) response.ArtistResponse
	GetArtistByTrack(id string) response.ArtistByTrackResponse
}
