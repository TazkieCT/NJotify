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
