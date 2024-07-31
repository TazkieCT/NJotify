package controller

import (
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
	// fmt.Println("Creating New User...")

	createUserRequest := request.CreateUserRequest{}
	err := ctx.ShouldBindJSON(&createUserRequest)
	helper.CheckPanic(err)

	token := controller.userService.CreateUser(createUserRequest)

	http.SetCookie(ctx.Writer, &http.Cookie{
		Name:     "token",
		Value:    token,
		Expires:  time.Now().Add(1 * time.Hour),
		Domain:   "localhost",
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
	})

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) ActivateUser(ctx *gin.Context) {
	activateUserRequest := request.ActivateUserRequest{}
	err := ctx.ShouldBindJSON(&activateUserRequest)
	helper.CheckPanic(err)

	token := controller.userService.ActivateUser(activateUserRequest.Email)

	http.SetCookie(ctx.Writer, &http.Cookie{
		Name:     "token",
		Value:    token,
		Expires:  time.Now().Add(1 * time.Hour),
		Domain:   "localhost",
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
	})

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *UserController) GetUser(ctx *gin.Context) {
	createUserRequest := request.CreateUserRequest{}
	if err := ctx.ShouldBindJSON(&createUserRequest); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	userResponse, token := controller.userService.GetUser(createUserRequest.Email, createUserRequest.Password)

	http.SetCookie(ctx.Writer, &http.Cookie{
		Name:     "token",
		Value:    token,
		Expires:  time.Now().Add(1 * time.Hour),
		Domain:   "localhost",
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteLaxMode,
	})

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
	// fmt.Println(idUser)

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
	// fmt.Println(idUser)

	controller.userService.RemoveArtist(idUser)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}
