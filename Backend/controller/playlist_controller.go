package controller

import (
	"net/http"

	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/data/response"
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/services"
	"github.com/gin-gonic/gin"
)

type PlaylistController struct {
	playlistService services.PlaylistService
}

func NewPlaylistController(service services.PlaylistService) *PlaylistController {
	return &PlaylistController{
		playlistService: service,
	}
}

func (controller *PlaylistController) CreatePlaylist(ctx *gin.Context) {
	createPlaylistRequest := request.CreatePlaylistRequest{}
	err := ctx.ShouldBindJSON(&createPlaylistRequest)
	helper.CheckPanic(err)

	controller.playlistService.CreatePlaylist(createPlaylistRequest)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *PlaylistController) GetAllPlaylistByUser(ctx *gin.Context) {
	idUser := ctx.Param("userId")

	playlistResponse := controller.playlistService.GetPlaylistByUser(idUser)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   playlistResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *PlaylistController) GetPlaylistById(ctx *gin.Context) {
	idPlaylist := ctx.Param("playlistId")

	playlistResponse := controller.playlistService.GetPlaylistById(idPlaylist)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   playlistResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *PlaylistController) AddTrackPlaylist(ctx *gin.Context) {
	addTrackPlaylistRequest := request.AddTrackToPlaylist{}
	err := ctx.ShouldBindJSON(&addTrackPlaylistRequest)
	helper.CheckPanic(err)

	controller.playlistService.AddTrackToPlaylist(addTrackPlaylistRequest)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}
	ctx.JSON(http.StatusOK, WebResponse)
}
