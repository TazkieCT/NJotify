package repository

import (
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"gorm.io/gorm"
)

type TrackRepositoryImpl struct {
	Db *gorm.DB
}

func NewTrackRepositoryImpl(db *gorm.DB) TrackRepository {
	return &TrackRepositoryImpl{Db: db}
}
func (c *TrackRepositoryImpl) CreateMusic(music model.Track) {
	result := c.Db.Create(&music)
	helper.CheckPanic(result.Error)
}

func (r *TrackRepositoryImpl) GetTrackByAlbum(id string) []model.Track {
	var tracks []model.Track
	result := r.Db.
		Preload("Album").
		Preload("Album.Artist").
		Preload("Album.Artist.User").
		Where("album_id = ?", id).
		Find(&tracks)
	helper.CheckPanic(result.Error)

	return tracks
}

func (r *TrackRepositoryImpl) GetTrackByPlaylist(playlistId string) []model.GetPlaylistTrack {
	var result []model.GetPlaylistTrack

	r.Db.Table("tracks").
		Select("tracks.id AS id_track, users.username AS artist_name, tracks.track_name, albums.album_name, albums.album_image, tracks.track_file, playlist_tracks.added_at AS added_at_playlist_track").
		Joins("JOIN playlist_tracks ON playlist_tracks.track_id = tracks.id").
		Joins("JOIN albums ON albums.id = tracks.album_id").
		Joins("JOIN artists ON artists.user_id = albums.artist_id").
		Joins("JOIN users ON users.id = albums.artist_id").
		Where("playlist_tracks.playlist_id = ?", playlistId).
		Scan(&result)

	return result
}

func (r *TrackRepositoryImpl) GetTrackByArtist(artistId string) []model.GetArtistTrack {
	var result []model.GetArtistTrack

	r.Db.Table("tracks").
		Select("DISTINCT tracks.id AS id_track, tracks.track_name, albums.album_image, tracks.track_file").
		Joins("JOIN albums ON albums.id = tracks.album_id").
		Joins("JOIN artists ON artists.user_id = albums.artist_id").
		Joins("JOIN users ON users.id = albums.artist_id").
		Where("artists.user_id = ?", artistId).
		Scan(&result)

	return result
}

func (r *TrackRepositoryImpl) GetTrackById(id string) model.Track {
	var track model.Track
	result := r.Db.Preload("Album").First(&track, "id = ?", id)
	helper.CheckPanic(result.Error)
	return track
}
