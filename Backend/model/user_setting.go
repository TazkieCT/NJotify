package model

import "github.com/google/uuid"

type UserSetting struct {
	UserId      uuid.UUID `gorm:"type:uuid;primaryKey"`
	MusicArtist int       `gorm:"type:integer"`
	Podcast     int       `gorm:"type:integer"`
	Follow      int       `gorm:"type:integer"`
	User        User      `gorm:"foreignKey:UserId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
