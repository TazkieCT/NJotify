package repository

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"github.com/go-redis/redis"
	"gorm.io/gorm"
)

type UserRepositoryImpl struct {
	Db    *gorm.DB
	Redis *redis.Client
}

func NewUserRepositoryImpl(db *gorm.DB, redis *redis.Client) UserRepository {
	return &UserRepositoryImpl{Db: db, Redis: redis}
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

	val, err := r.Redis.Get("email").Result()
	if err == redis.Nil {
		result := r.Db.First(&user, "email = ?", email)
		helper.CheckPanic(result.Error)

		userJson, err := json.Marshal(user)
		if err != nil {
			helper.CheckPanic(err)
		}
		err = r.Redis.Set("email", userJson, time.Hour).Err()
		helper.CheckPanic(err)

		fmt.Println("User retrieved from database and saved to cache")
	} else if err != nil {
		helper.CheckPanic(err)
	} else {
		err = json.Unmarshal([]byte(val), &user)
		if err != nil {
			helper.CheckPanic(err)
		}
		fmt.Println("User retrieved from cache")
	}

	return user
}

func (u *UserRepositoryImpl) EditUser(user model.User, reqUser request.EditUserRequest) {
	result := u.Db.Model(&user).Where("email = ?", user.Email).Updates(reqUser)
	helper.CheckPanic(result.Error)

	err := u.Redis.Del("email").Err()
	if err != nil {
		helper.CheckPanic(err)
	}
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

	err := u.Redis.Del("email").Err()
	if err != nil {
		helper.CheckPanic(err)
	}
}

func (d *UserRepositoryImpl) Logout() {
	err := d.Redis.Del("email").Err()
	if err != nil {
		helper.CheckPanic(err)
	}
}
