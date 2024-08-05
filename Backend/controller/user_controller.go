package controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/data/response"
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/services"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	userService services.UserService
}

func NewUserController(service services.UserService) *UserController {
	return &UserController{
		userService: service,
	}
}

func (controller *UserController) CreateUser(ctx *gin.Context) {
	createUserRequest := request.CreateUserRequest{}
	err := ctx.ShouldBindJSON(&createUserRequest)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	token := controller.userService.CreateUser(createUserRequest)

	ctx.SetCookie(
		"activation_token",
		token,
		86400,
		"/",
		"localhost",
		false,
		false,
	)

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   token,
	}
	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) ActivateUser(ctx *gin.Context) {
	token := ctx.Param("token")

	email, err := helper.ValidateJWT(token)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid token", "error": err.Error()})
		return
	}

	// fmt.Printf("User email: %s\n", email)

	controller.userService.ActivateUser(email)

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) Forgot(ctx *gin.Context) {
	email := ctx.Param("email")

	fmt.Printf("User email: %s\n", email)

	token := controller.userService.Forgot(email)

	ctx.SetCookie(
		"reset_token",
		token,
		86400,
		"/",
		"localhost",
		false,
		false,
	)

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   token,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) Reset(ctx *gin.Context) {
	var resetPass request.ResetPassword

	if err := ctx.ShouldBindJSON(&resetPass); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	// fmt.Println("AAAAAAAAAAA")
	// fmt.Println(resetPass.ResetToken)
	email, err := helper.ValidateJWT(resetPass.ResetToken)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid token", "error": err.Error()})
		return
	}

	if err := controller.userService.ResetPassword(email, resetPass.Password); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to reset password", "error": err.Error()})
		return
	}

	webResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *UserController) GetUser(ctx *gin.Context) {
	var createUserRequest request.CreateUserRequest
	if err := ctx.ShouldBindJSON(&createUserRequest); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	userResponse, token := controller.userService.GetUser(createUserRequest.Email, createUserRequest.Password)

	userResponse.Token = token

	http.SetCookie(ctx.Writer, &http.Cookie{
		Name:     "token",
		Value:    token,
		Expires:  time.Now().Add(24 * time.Hour),
		Domain:   "localhost",
		Path:     "/",
		HttpOnly: false,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
	})

	webResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   userResponse,
	}

	ctx.JSON(http.StatusOK, webResponse)
}

func (controller *UserController) FetchUser(ctx *gin.Context) {
	fetchUserRequest := request.ActivateUserRequest{}
	if err := ctx.ShouldBindJSON(&fetchUserRequest); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	userResponse := controller.userService.FetchUser(fetchUserRequest.Email)

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   userResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) UpdateUser(ctx *gin.Context) {
	editUserRequest := request.EditUserRequest{}
	err := ctx.ShouldBindJSON(&editUserRequest)
	helper.CheckPanic(err)

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) GetVerified(ctx *gin.Context) {
	getVerifiedUser := request.GetVerifiedUser{}
	if err := ctx.ShouldBindJSON(&getVerifiedUser); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	controller.userService.GetVerifiedUser(getVerifiedUser)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) EditProfile(ctx *gin.Context) {
	editProfileRequest := request.EditProfileRequest{}
	if err := ctx.ShouldBindJSON(&editProfileRequest); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	controller.userService.EditProfile(editProfileRequest)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) GetAllVerifiedUser(ctx *gin.Context) {
	userResponse := controller.userService.GetAllVerifiedUser()
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   userResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) SetArtist(ctx *gin.Context) {
	idUser := ctx.Param("userId")

	controller.userService.SetArtist(idUser)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) RemoveArtist(ctx *gin.Context) {
	idUser := ctx.Param("userId")

	controller.userService.RemoveArtist(idUser)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) Logout(ctx *gin.Context) {
	controller.userService.Logout()

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) GetUserByArtist(ctx *gin.Context) {
	idUser := ctx.Param("userId")

	userResponse := controller.userService.GetUserByArtist(idUser)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   userResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) UpdateSetting(ctx *gin.Context) {
	editSettingRequest := request.EditSettingRequest{}
	err := ctx.ShouldBindJSON(&editSettingRequest)
	helper.CheckPanic(err)

	controller.userService.UpdateUserSetting(editSettingRequest.UserId, editSettingRequest.MusicArtist, editSettingRequest.Podcast, editSettingRequest.Follow)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) GetUserSetting(ctx *gin.Context) {
	idUser := ctx.Param("userId")

	userResponse := controller.userService.GetUserSetting(idUser)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   userResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}
