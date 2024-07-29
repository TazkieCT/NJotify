package model

import "github.com/google/uuid"

type Playlist struct {
	Id            uuid.UUID `gorm:"primaryKey"`
	UserId        uuid.UUID `gorm:"type:uuid;not null"`
	User          User      `gorm:"foreignKey:UserId"`
	PlaylistImage string    `gorm:"type:text;default:public\\image\\Album_Default.png"`
	PlaylistName  string    `gorm:"type:varchar(255);not null"`
	PlaylistDesc  string    `gorm:"type:text;not null"`
}
