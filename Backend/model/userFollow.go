package model

import (
	"github.com/google/uuid"
)

type UserFollow struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey"`
	FollowerId  uuid.UUID `gorm:"type:uuid;not null"`
	FollowingId uuid.UUID `gorm:"type:uuid;not null"`
}
