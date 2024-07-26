package model

import (
	"github.com/google/uuid"
)

type User struct {
	Id        uuid.UUID `gorm:"type:uuid;primaryKey"`
	Username  string    `gorm:"type:varchar(255)"`
	Email     string    `gorm:"type:varchar(255);unique"`
	Password  string    `gorm:"type:varchar(255)"`
	Gender    string    `gorm:"type:varchar(255)"`
	Dob       string    `gorm:"type:date;default:NULL"`
	Country   string    `gorm:"type:varchar(255)"`
	Roles     string    `gorm:"type:varchar(255);default:listener"`
	Albums    []Album
	Playlists []Playlist
}
