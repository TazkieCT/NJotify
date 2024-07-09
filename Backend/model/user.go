package model

import (
	"github.com/google/uuid"
)

type User struct {
	Id       uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	Email    string    `gorm:"type:varchar(255)"`
	Password string    `gorm:"type:varchar(255)"`
	Roles    string    `gorm:"type:varchar(255);default:"listener"`
}
