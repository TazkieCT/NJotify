package services

import (
	"github.com/TazkieCT/njotify/data/response"
	"github.com/google/uuid"
)

type TrackService interface {
	CreateMusic(album_id uuid.UUID, name string, filePath string)
	GetTrackByAlbum(album_id string) []response.TrackAlbum
	GetTrackByPlaylist(playlist_id string) []response.TrackPlaylist
	GetTrackByArtist(artist_id string) []response.TrackArtist
	GetTrackById(id string) response.TrackById
	AddTrackToQueue(trackId string)
	RemoveTrackFromQueue(trackId string)
	GetQueue() []response.TrackResponse
	ResetQueue()
}
