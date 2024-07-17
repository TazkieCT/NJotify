package services

import (
	"fmt"
	"net/smtp"
	"strings"
	"time"

	"github.com/TazkieCT/njotify/constant"
	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/data/response"
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/model"
	"github.com/TazkieCT/njotify/repository"
	"github.com/dgrijalva/jwt-go"
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

func (c *UserServiceImpl) CreateUser(user request.CreateUserRequest) {
	err := c.Validate.Struct(user)
	helper.CheckPanic(err)

	uuidV4, err := uuid.NewRandom()
	helper.CheckPanic(err)

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	helper.CheckPanic(err)

	userModel := model.User{
		Id:       uuidV4,
		Email:    user.Email,
		Password: string(hashedPassword),
	}
	c.UserRepository.SignIn(userModel)

	// Generate JWT token
	token, err := generateJWT(user.Email)
	helper.CheckPanic(err)

	to := []string{user.Email}
	cc := []string{"tazkiect25@gmail.com"}
	subject := "Account Activation - NJotify"
	message := fmt.Sprintf("Hello,\n\nYour account has been created. Here is your activation token: %s\n\nThank you!", token)

	err_email := sendMail(to, cc, subject, message)
	helper.CheckPanic(err_email)
}

func (u *UserServiceImpl) ActivateUser(email string) {
	user := u.UserRepository.GetUser(email)
	user.Roles = "listener"
	u.UserRepository.Activate(user)
}

func (r *UserServiceImpl) GetUser(email string) response.UserResponse {
	result := r.UserRepository.GetUser(email)

	user := response.UserResponse{
		Id:       result.Id,
		Username: result.Username,
		Email:    result.Email,
		Password: result.Password,
		Gender:   result.Gender,
		Dob:      *result.Dob,
		Role:     "inactive",
	}

	return user
}

func sendMail(to []string, cc []string, subject, message string) error {
	body := "From: " + constant.CONFIG_SENDER_NAME + "\n" +
		"To: " + strings.Join(to, ",") + "\n" +
		"Cc: " + strings.Join(cc, ",") + "\n" +
		"Subject: " + subject + "\n\n" +
		message

	auth := smtp.PlainAuth("", constant.CONFIG_AUTH_EMAIL, constant.CONFIG_AUTH_PASSWORD, constant.CONFIG_SMTP_HOST)
	smtpAddr := fmt.Sprintf("%s:%d", constant.CONFIG_SMTP_HOST, constant.CONFIG_SMTP_PORT)

	err := smtp.SendMail(smtpAddr, auth, constant.CONFIG_AUTH_EMAIL, append(to, cc...), []byte(body))
	if err != nil {
		return err
	}

	return nil
}

func generateJWT(email string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(time.Hour * time.Duration(constant.JWT_EXPIRATION_HOURS)).Unix(),
	})

	tokenString, err := token.SignedString([]byte(constant.JWT_SECRET_KEY))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
