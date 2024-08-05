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

func (controller *TrackController) GetAllTrackByPlaylist(ctx *gin.Context) {
	idPlaylist := ctx.Param("playlistId")

	trackResponse := controller.trackService.GetTrackByPlaylist(idPlaylist)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   trackResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *TrackController) GetAllTrackByArtist(ctx *gin.Context) {
	idPlaylist := ctx.Param("artistId")

	trackResponse := controller.trackService.GetTrackByArtist(idPlaylist)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   trackResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *TrackController) GetAllTrackById(ctx *gin.Context) {
	idTrack := ctx.Param("trackId")

	trackResponse := controller.trackService.GetTrackById(idTrack)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   trackResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *TrackController) AddTrackToQueue(ctx *gin.Context) {
	idTrack := ctx.Param("trackId")

	controller.trackService.AddTrackToQueue(idTrack)

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *TrackController) RemoveTrackFromQueue(ctx *gin.Context) {
	idTrack := ctx.Param("trackId")

	controller.trackService.RemoveTrackFromQueue(idTrack)

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *TrackController) ResetQueue(ctx *gin.Context) {
	controller.trackService.ResetQueue()

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *TrackController) GetQueue(ctx *gin.Context) {
	trackResponse := controller.trackService.GetQueue()

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   trackResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *TrackController) ListenCount(ctx *gin.Context) {
	idTrack := ctx.Param("trackId")
	controller.trackService.ListenCount(idTrack)

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}
