package model

import "github.com/google/uuid"

type Artist struct {
	UserId      uuid.UUID `gorm:"type:uuid;primaryKey"`
	BannerImage string    `gorm:"type:text"`
	About       string    `gorm:"type:text"`
	User        User      `gorm:"foreignKey:UserId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Albums      []Album
}
