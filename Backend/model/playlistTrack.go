package model

import "github.com/google/uuid"

type PlaylistTrack struct {
	PlaylistId uuid.UUID `gorm:"primaryKey"`
	TrackId    uuid.UUID `gorm:"primaryKey"`
}
