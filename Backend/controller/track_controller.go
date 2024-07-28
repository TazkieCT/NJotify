package controller

import (
	"net/http"

	"github.com/TazkieCT/njotify/data/response"
	"github.com/TazkieCT/njotify/services"
	"github.com/gin-gonic/gin"
)

type TrackController struct {
	trackService services.TrackService
}

func NewTrackController(service services.TrackService) *TrackController {
	return &TrackController{
		trackService: service,
	}
}

func (controller *TrackController) GetAllTrackByAlbum(ctx *gin.Context) {
	idAlbum := ctx.Param("albumId")

	trackResponse := controller.trackService.GetTrackByAlbum(idAlbum)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   trackResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}
