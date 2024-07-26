package model

type PlaylistTrack struct {
	PlaylistID uint `gorm:"primaryKey"`
	TrackID    uint `gorm:"primaryKey"`
}
