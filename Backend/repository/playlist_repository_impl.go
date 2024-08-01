package repository

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"gorm.io/gorm"
)

type PlaylistRepositoryImpl struct {
	Db *gorm.DB
}

func NewPlaylistRepositoryImpl(db *gorm.DB) PlaylistRepository {
	return &PlaylistRepositoryImpl{Db: db}
}

func (c *PlaylistRepositoryImpl) CreatePlaylist(playlist model.Playlist) {
	result := c.Db.Create(&playlist)
	helper.CheckPanic(result.Error)
}

func (r *PlaylistRepositoryImpl) GetPlaylistByUser(id string) []model.Playlist {
	var playlists []model.Playlist
	result := r.Db.Where("user_id = ?", id).Preload("User").Find(&playlists)
	helper.CheckPanic(result.Error)
	return playlists
}

func (r *PlaylistRepositoryImpl) GetPlaylistById(id string) model.Playlist {
	var playlist model.Playlist
	result := r.Db.Where("id = ?", id).Preload("User").Find(&playlist)
	helper.CheckPanic(result.Error)
	return playlist
}

func (c *PlaylistRepositoryImpl) AddTrackToPlaylist(playlistTrack model.PlaylistTrack) {
	result := c.Db.Create(&playlistTrack)
	helper.CheckPanic(result.Error)
}

func (r *PlaylistRepositoryImpl) DeletePlaylistTrack(trackPlaylist request.TrackToPlaylist) {
	var playlist model.PlaylistTrack
	result := r.Db.Where("playlist_id = ? AND track_id = ?", trackPlaylist.Playlist, trackPlaylist.Track).Delete(&playlist)
	helper.CheckPanic(result.Error)
}

func (r *PlaylistRepositoryImpl) GetPlaylistsByArtist(artistId string) []model.Playlist {
	var playlists []model.Playlist

	result := r.Db.Table("playlists").
		Joins("JOIN playlist_tracks ON playlists.id = playlist_tracks.playlist_id").
		Joins("JOIN tracks ON playlist_tracks.track_id = tracks.id").
		Joins("JOIN albums ON tracks.album_id = albums.id").
		Where("albums.artist_id = ?", artistId).
		Group("playlists.id").
		Find(&playlists)
	helper.CheckPanic(result.Error)

	return playlists
}

func (d *PlaylistRepositoryImpl) DeletePlaylist(id string) {
	var playlist model.Playlist
	result := d.Db.Delete(&playlist, "id = ?", id)
	helper.CheckPanic(result.Error)
}
