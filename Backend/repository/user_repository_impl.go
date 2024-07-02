package repository

import (
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"gorm.io/gorm"
)

type UserRepositoryImpl struct {
	Db *gorm.DB
}

func NewUserRepositoryImpl(db *gorm.DB) UserRepository {
	return &UserRepositoryImpl{Db: db}
}

func (c *UserRepositoryImpl) Save(user model.User) {
	result := c.Db.Create(&user)
	helper.CheckPanic(result.Error)
}

func (r *UserRepositoryImpl) FindUser() model.User {
	var user model.User
	result := r.Db.Find(&user)
	helper.CheckPanic(result.Error)
	return user
}
