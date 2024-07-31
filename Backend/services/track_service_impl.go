package services

import (
	"github.com/TazkieCT/njotify/data/response"
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"github.com/TazkieCT/njotify/repository"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type TrackServiceImpl struct {
	TrackRepository repository.TrackRepository
	Validate        *validator.Validate
}

func NewTrackServiceImpl(trackRepository repository.TrackRepository, validate *validator.Validate) TrackService {
	return &TrackServiceImpl{
		TrackRepository: trackRepository,
		Validate:        validate,
	}
}

func (c *TrackServiceImpl) CreateMusic(album_id uuid.UUID, name string, filePath string) {
	musicId, err := uuid.NewRandom()
	helper.CheckPanic(err)

	musicModel := model.Track{
		Id:        musicId,
		AlbumId:   album_id,
		TrackName: name,
		TrackFile: filePath,
	}

	c.TrackRepository.CreateMusic(musicModel)
}

func (r *TrackServiceImpl) GetTrackByAlbum(album_id string) []response.TrackAlbum {
	tracks := r.TrackRepository.GetTrackByAlbum(album_id)

	var trackAlbums []response.TrackAlbum
	for _, track := range tracks {
		trackAlbum := response.TrackAlbum{
			Id:     track.Id.String(),
			Artist: track.Album.Artist.User.Username,
			Name:   track.TrackName,
			File:   track.TrackFile,
			Album:  track.Album.AlbumName,
			Image:  track.Album.AlbumImage,
		}
		trackAlbums = append(trackAlbums, trackAlbum)
	}

	return trackAlbums
}

func (r *TrackServiceImpl) GetTrackByPlaylist(playlist_id string) []response.TrackPlaylist {
	tracks := r.TrackRepository.GetTrackByPlaylist(playlist_id)

	var trackPlaylists []response.TrackPlaylist
	for _, track := range tracks {
		// fmt.Println("Artist : " + track.ArtistName)
		// fmt.Println(track)
		trackAlbum := response.TrackPlaylist{
			Id:         track.IdTrack,
			Artist:     track.ArtistName,
			Name:       track.TrackName,
			File:       track.FileTrack,
			AlbumName:  track.AlbumName,
			AlbumImage: track.AlbumImage,
			AddedAt:    track.AddedAtPlaylistTrack,
		}
		trackPlaylists = append(trackPlaylists, trackAlbum)
	}

	return trackPlaylists
}

func (r *TrackServiceImpl) GetTrackByArtist(artist_id string) []response.TrackArtist {
	tracks := r.TrackRepository.GetTrackByArtist(artist_id)

	var trackArtists []response.TrackArtist
	for _, track := range tracks {
		// fmt.Println("Artist : " + track.TrackName)
		// fmt.Println(track)
		trackArtist := response.TrackArtist{
			Id:         track.IdTrack,
			Name:       track.TrackName,
			File:       track.FileTrack,
			AlbumImage: track.AlbumImage,
		}
		trackArtists = append(trackArtists, trackArtist)
	}

	return trackArtists
}

func (r *TrackServiceImpl) GetTrackById(id string) response.TrackById {
	track := r.TrackRepository.GetTrackById(id)

	trackById := response.TrackById{
		Id:         track.Id.String(),
		Name:       track.TrackName,
		File:       track.TrackFile,
		AlbumImage: track.Album.AlbumImage,
		AlbumName:  track.Album.AlbumName,
	}

	return trackById
}
