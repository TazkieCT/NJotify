package controller

import (
	"net/http"

	"github.com/TazkieCT/njotify/data/response"
	"github.com/TazkieCT/njotify/services"
	"github.com/gin-gonic/gin"
)

type SearchController struct {
	searchService services.SearchService
}

func NewSearchController(service services.SearchService) *SearchController {
	return &SearchController{
		searchService: service,
	}
}

func (controller *SearchController) Searching(ctx *gin.Context) {
	search := ctx.Param("search")

	searchResponse := controller.searchService.Search(search)

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   searchResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}
