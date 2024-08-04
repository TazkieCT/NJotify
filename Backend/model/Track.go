package model

import "github.com/google/uuid"

type Track struct {
	Id            uuid.UUID `gorm:"primaryKey"`
	TrackName     string    `gorm:"type:varchar(255);not null"`
	TrackFile     string    `gorm:"type:varchar(255);not null"`
	Duration      int       `gorm:"type:integer"`
	ListenCount   int       `gorm:"type:integer"`
	AlbumId       uuid.UUID `gorm:"type:uuid;not null"`
	Album         Album     `gorm:"foreignKey:AlbumId"`
	PlaylistTrack []PlaylistTrack
}
