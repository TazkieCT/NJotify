package controller

import (
	"net/http"

	"github.com/TazkieCT/njotify/data/response"
	"github.com/TazkieCT/njotify/services"
	"github.com/gin-gonic/gin"
)

type ArtistController struct {
	artistService services.ArtistService
}

func NewArtistController(service services.ArtistService) *ArtistController {
	return &ArtistController{
		artistService: service,
	}
}

func (controller *ArtistController) GetArtistById(ctx *gin.Context) {
	idArtist := ctx.Param("artistId")

	artistResponse := controller.artistService.GetArtist(idArtist)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   artistResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *ArtistController) GetArtistByTrack(ctx *gin.Context) {
	idArtist := ctx.Param("trackId")

	artistResponse := controller.artistService.GetArtistByTrack(idArtist)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   artistResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}
