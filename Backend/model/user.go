package model

import (
	"github.com/google/uuid"
)

type User struct {
	Id       uuid.UUID `gorm:"type:uuid;primary_key"`
	Username string    `gorm:"type:varchar(255)"`
	Email    string    `gorm:"type:varchar(255)"`
	Password string    `gorm:"type:varchar(255)"`
	Gender   string    `gorm:"type:varchar(255)"`
	Dob      *string   `gorm:"type:date"`
	Roles    string    `gorm:"type:varchar(255);default:"listener"`
}
