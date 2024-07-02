package services

import (
	"github.com/TazkieCT/njotify/repository"
	"github.com/go-playground/validator/v10"
)

type UserServiceImpl struct {
	UserRepository repository.UserRepository
	Validate       *validator.Validate
}

// func NewUserServiceImpl(userRepository repository.UserRepository, validate validator.Validate) UserService {
// 	return &UserServiceImpl{
// 		UserRepository: userRepository,
// 		Validate:       validate,
// 	}
// }

// func Create(user request.CreateUserRequest){

// }

// func FindUser() response.UserResponse {

// }
