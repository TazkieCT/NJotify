package services

import (
	"bytes"
	"fmt"
	"image"
	"image/png"
	"net/smtp"
	"os"
	"path/filepath"
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

	name := strings.Split(user.Email, "@")
	if len(name) == 0 {
		helper.CheckPanic(fmt.Errorf("invalid email format"))
	}
	username := strings.ReplaceAll(name[0], "_", " ")
	user.Email = strings.ToLower(user.Email)

	userModel := model.User{
		Id:       uuidV4,
		Username: username,
		Email:    user.Email,
		Password: string(hashedPassword),
		Roles:    "listener",
	}
	c.UserRepository.SignIn(userModel)

	// Generate JWT token
	token, err := generateJWT(user.Email)
	helper.CheckPanic(err)

	// Send email activation (masih belum bisa)
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

func (r *UserServiceImpl) GetUser(email string, password string) response.UserResponse {
	email = strings.ToLower(email)
	result := r.UserRepository.GetUser(email)
	err := bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(password))
	helper.CheckPanic(err)

	user := response.UserResponse{
		Id:       result.Id,
		Username: result.Username,
		Email:    result.Email,
		Gender:   result.Gender,
		Dob:      result.Dob,
		Country:  result.Country,
		Role:     result.Roles,
	}

	return user
}

func (u *UserServiceImpl) EditUser(userReq request.EditUserRequest) {
	// fmt.Println("AAAAAAAAAAA")
	user := u.UserRepository.GetUser(userReq.Email)
	// fmt.Println("BBBBBBBBBBBB")
	u.UserRepository.EditUser(user, userReq)
	// fmt.Println("CCCCCCCCCCCC")
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

func (c *UserServiceImpl) GetVerifiedUser(user request.GetVerifiedUser) {
	userId, err := uuid.Parse(user.UserId)
	helper.CheckPanic(err)

	imagePath, err := SavePicture("./public/image/", user.Banner, userId.String())
	helper.CheckPanic(err)

	artist := model.Artist{
		UserId:      userId.String(),
		BannerImage: imagePath,
		About:       user.About,
	}

	c.UserRepository.GetVerified(artist)
}

func SavePicture(path string, data []byte, userId string) (string, error) {
	now := time.Now().Format("20060102150405")
	ext := ".png"
	fileName := fmt.Sprintf("%s_%s%s", now, userId, ext)
	filePath := filepath.Join(path, fileName)

	err := os.MkdirAll(path, os.ModePerm)
	if err != nil {
		return "", fmt.Errorf("failed to create directory: %w", err)
	}

	img, _, err := image.Decode(bytes.NewReader(data))
	if err != nil {
		return "", fmt.Errorf("failed to decode image: %w", err)
	}
	outFile, err := os.Create(filePath)
	if err != nil {
		return "", fmt.Errorf("failed to create file: %w", err)
	}
	defer outFile.Close()

	err = png.Encode(outFile, img)
	if err != nil {
		return "", fmt.Errorf("failed to encode image: %w", err)
	}

	return filePath, nil
}
