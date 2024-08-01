package repository

import (
	"github.com/TazkieCT/njotify/data/request"
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

func (c *UserRepositoryImpl) SignIn(user model.User) {
	result := c.Db.Create(&user)
	helper.CheckPanic(result.Error)
}

func (u *UserRepositoryImpl) Activate(email string) {
	var user model.User
	result := u.Db.Model(&user).Where("email = ?", email).Update("roles", "listener")
	helper.CheckPanic(result.Error)
}

func (u *UserRepositoryImpl) ChangePass(email string, password string) {
	var user model.User
	result := u.Db.Model(&user).Where("email = ?", email).Update("password", password)
	helper.CheckPanic(result.Error)
}

func (r *UserRepositoryImpl) GetUser(email string) model.User {
	var user model.User
	result := r.Db.First(&user, "email = ?", email)
	helper.CheckPanic(result.Error)
	return user
}

func (u *UserRepositoryImpl) EditUser(user model.User, reqUser request.EditUserRequest) {
	result := u.Db.Model(&user).Where("email = ?", user.Email).Updates(reqUser)
	helper.CheckPanic(result.Error)
}

func (c *UserRepositoryImpl) GetVerified(artist model.Artist) {
	result := c.Db.Create(&artist)
	helper.CheckPanic(result.Error)
}

func (r *UserRepositoryImpl) GetVerifyUser() []model.User {
	var users []model.User
	result := r.Db.Joins("JOIN artists ON artists.user_id = users.id").
		Where("users.roles = ?", "listener").
		Find(&users)
	helper.CheckPanic(result.Error)
	return users
}

func (u *UserRepositoryImpl) AcceptVerify(id string) {
	var user model.User
	result := u.Db.Model(&user).Where("id = ?", id).Update("roles", "artist")
	helper.CheckPanic(result.Error)
}

func (d *UserRepositoryImpl) RemoveArtist(id string) {
	var artist model.Artist
	result := d.Db.Where("user_id = ?", id).Delete(&artist)
	helper.CheckPanic(result.Error)
}

func (u *UserRepositoryImpl) EditProfile(id string, image string) {
	var user model.User
	result := u.Db.Model(&user).Where("id = ?", id).Update("profile", image)
	helper.CheckPanic(result.Error)
}
