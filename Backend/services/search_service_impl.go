package services

import (
	"strings"

	"github.com/TazkieCT/njotify/data/response"
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/repository"
	"github.com/go-playground/validator/v10"
)

type SearchServiceImpl struct {
	SearchRepository   repository.SearchRepository
	Validate           *validator.Validate
	ArtistRepository   repository.ArtistRepository
	AlbumRepository    repository.AlbumRepository
	TrackRepository    repository.TrackRepository
	PlaylistRepository repository.PlaylistRepository
}

func NewSearchServiceImpl(searchRepository repository.SearchRepository, validate *validator.Validate, artistRepository repository.ArtistRepository, albumRepository repository.AlbumRepository, trackRepository repository.TrackRepository, playlistRepository repository.PlaylistRepository) SearchService {
	return &SearchServiceImpl{
		SearchRepository:   searchRepository,
		Validate:           validate,
		ArtistRepository:   artistRepository,
		AlbumRepository:    albumRepository,
		TrackRepository:    trackRepository,
		PlaylistRepository: playlistRepository,
	}
}

func (r *SearchServiceImpl) Search(search string) response.SearchResponse {
	// Convert search query to lowercase
	search = strings.ToLower(search)

	tracks := r.TrackRepository.GetAllTracks()
	albums := r.AlbumRepository.GetAllAlbum()
	artists := r.ArtistRepository.GetAllArtist()
	playlists := r.PlaylistRepository.GetAllPlaylist()

	var typeResult string
	minDist := int(^uint(0) >> 1)

	var trackResponse []response.TrackSearchResponse
	for _, track := range tracks {
		dist := helper.DamerauLevenshtein(strings.ToLower(track.TrackName), search)
		if dist < 5 {
			filterTrack := response.TrackSearchResponse{
				Id:     track.Id.String(),
				Name:   track.TrackName,
				Image:  track.Album.AlbumImage,
				Artist: track.Album.Artist.User.Username,
			}
			trackResponse = append(trackResponse, filterTrack)
			if dist < minDist {
				minDist = dist
				typeResult = "track"
			}
		}
	}

	var albumResponse []response.AlbumSearchResponse
	for _, album := range albums {
		dist := helper.DamerauLevenshtein(strings.ToLower(album.AlbumName), search)
		if dist < 5 {
			filterAlbum := response.AlbumSearchResponse{
				Id:     album.Id.String(),
				Artist: album.Artist.User.Username,
				Name:   album.AlbumName,
				Type:   album.AlbumType,
				Image:  album.AlbumImage,
				Date:   album.CreatedAt.String(),
			}
			albumResponse = append(albumResponse, filterAlbum)
			if dist < minDist {
				minDist = dist
				typeResult = "album"
			}
		}
	}

	var artistResponse []response.UserSearchResponse
	for _, artist := range artists {
		dist := helper.DamerauLevenshtein(strings.ToLower(artist.User.Username), search)
		if dist < 5 {
			filterArtist := response.UserSearchResponse{
				Id:           artist.UserId.String(),
				Name:         artist.User.Username,
				ProfileImage: artist.User.Profile,
				Role:         artist.User.Roles,
			}
			artistResponse = append(artistResponse, filterArtist)
			if dist < minDist {
				minDist = dist
				typeResult = "artist"
			}
		}
	}

	var playlistResponse []response.PlaylistSearchResponse
	for _, playlist := range playlists {
		dist := helper.DamerauLevenshtein(strings.ToLower(playlist.PlaylistName), search)
		if dist < 5 {
			filterPlaylist := response.PlaylistSearchResponse{
				Id:    playlist.Id.String(),
				Name:  playlist.PlaylistName,
				Image: playlist.PlaylistImage,
			}
			playlistResponse = append(playlistResponse, filterPlaylist)
			if dist < minDist {
				minDist = dist
				typeResult = "playlist"
			}
		}
	}

	return response.SearchResponse{
		Type:     typeResult,
		Track:    trackResponse,
		Album:    albumResponse,
		User:     artistResponse,
		Playlist: playlistResponse,
	}
}
