package services

import (
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"github.com/TazkieCT/njotify/repository"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type UserServiceImpl struct {
	UserRepository repository.UserRepository
	Validate       *validator.Validate
}

func NewUserServiceImpl(userRepository repository.UserRepository, validate *validator.Validate) UserService {
	return &UserServiceImpl{
		UserRepository: userRepository,
		Validate:       validate,
	}
}

func (c *UserServiceImpl) Create(user request.CreateUserRequest) {
	err := c.Validate.Struct(user)
	helper.CheckPanic(err)

	uuidV4, err := uuid.NewRandom()
	helper.CheckPanic(err)

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	helper.CheckPanic(err)

	userModel := model.User{
		Id: uuidV4,
		Username: user.Username,
		Email:      user.Email,
		Password: string(hashedPassword),
		Gender: user.Gender,
		Dob: user.Dob,
		Roles:   "listener",
	}
	c.UserRepository.Save(userModel)
}

// func (r *UserServiceImpl) FindUser(user model.User, id string) response.UserResponse {
// 	result := r.UserRepository.FindUser(user, id)

// 	user := response.UserResponse{
// 		Id:       result.Id,
// 		Email:    result.Email,
// 		Password: result.Password,
// 		Role:     result.Roles,
// 	}

// 	return user
// }
