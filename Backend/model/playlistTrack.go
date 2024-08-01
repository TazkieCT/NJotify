package model

import "github.com/google/uuid"

type PlaylistTrack struct {
	PlaylistId uuid.UUID `gorm:"primaryKey"`
	TrackId    uuid.UUID `gorm:"primaryKey"`
	AddedAt    string    `gorm:"type:date;default:NULL"`
	Track      Track     `gorm:"foreignKey:TrackId"`
	Playlist   Playlist  `gorm:"foreignKey:PlaylistId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
