package model

import "github.com/google/uuid"

type Playlist struct {
	Id           uuid.UUID `gorm:"primaryKey"`
	UserId       uuid.UUID `gorm:"type:uuid;not null"`
	User         User      `gorm:"foreignKey:UserId"`
	PlaylistName string    `gorm:"type:varchar(255);not null"`
	PlaylistDesc string    `gorm:"type:text;not null"`
}
