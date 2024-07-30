package model

import (
	"time"

	"github.com/google/uuid"
)

type Album struct {
	Id         uuid.UUID `gorm:"type:uuid;primaryKey"`
	ArtistId   uuid.UUID `gorm:"type:uuid;not null"`
	AlbumName  string    `gorm:"type:varchar(255);not null"`
	AlbumImage string    `gorm:"type:varchar(255);not null"`
	AlbumType  string    `gorm:"type:varchar(255);not null"`
	CreatedAt  time.Time `gorm:"autoCreateTime"`
	Artist     Artist    `gorm:"foreignKey:ArtistId"`
	Tracks     []Track
}
