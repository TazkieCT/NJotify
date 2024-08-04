package controller

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/TazkieCT/njotify/data/request"
	"github.com/TazkieCT/njotify/data/response"
	"github.com/TazkieCT/njotify/helper"
	"github.com/TazkieCT/njotify/services"
	"github.com/faiface/beep/mp3"
	"github.com/gin-gonic/gin"
)

type AlbumController struct {
	albumService services.AlbumService
}

func NewAlbumController(service services.AlbumService) *AlbumController {
	return &AlbumController{
		albumService: service,
	}
}

func (controller *AlbumController) CreateAlbum(ctx *gin.Context) {
	createAlbumRequest := request.CreateAlbumRequest{}
	createAlbumRequest.Artist = ctx.PostForm("artist")
	createAlbumRequest.Name = ctx.PostForm("title")
	createAlbumRequest.Type = ctx.PostForm("collectionType")

	file, err := ctx.FormFile("image")
	helper.CheckPanic(err)

	src, err := file.Open()
	helper.CheckPanic(err)
	defer src.Close()

	imageData, err := ioutil.ReadAll(src)
	helper.CheckPanic(err)

	createAlbumRequest.Image = imageData

	trackFiles := ctx.Request.MultipartForm.File["trackFiles[]"]
	trackNames := ctx.Request.PostForm["trackNames[]"]
	album_id := controller.albumService.CreateAlbum(createAlbumRequest)

	for i, trackFile := range trackFiles {
		if i < len(trackNames) {
			name := trackNames[i]
			dateNow := time.Now().Format("20060102150405")
			newFileName := fmt.Sprintf("%s_%s", dateNow, trackFile.Filename)
			filePath := filepath.Join("public", "tracks", newFileName)
			if err := ctx.SaveUploadedFile(trackFile, filePath); err != nil {
				ctx.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Failed to upload track %d", i+1)})
				return
			}
			fmt.Printf("Track %d: %s - %s\n", i+1, name, filePath)

			// Open the saved file to read its duration
			trackFileHandle, err := os.Open(filePath)
			helper.CheckPanic(err)
			defer trackFileHandle.Close()

			streamer, format, err := mp3.Decode(trackFileHandle)
			helper.CheckPanic(err)
			defer streamer.Close()

			duration := int(float64(streamer.Len()) / float64(format.SampleRate.N(time.Second)))

			controller.albumService.CreateMusic(album_id, name, filePath, duration)
		}
	}

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   nil,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *AlbumController) GetAllAlbum(ctx *gin.Context) {
	// fmt.Println("bbbbbbbbbbb")
	albumResponse := controller.albumService.GetAllAlbum()
	// fmt.Println("AAAAAAAAAAAAA")
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   albumResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *AlbumController) GetAllAlbumByArtist(ctx *gin.Context) {
	idArtist := ctx.Param("artistId")
	albumResponse := controller.albumService.GetAlbumByArtist(idArtist)

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   albumResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *AlbumController) GetAllAlbumById(ctx *gin.Context) {
	idAlbum := ctx.Param("albumId")

	albumResponse := controller.albumService.GetAlbumById(idAlbum)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   albumResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *AlbumController) GetAlbumByTrack(ctx *gin.Context) {
	idTrack := ctx.Param("trackId")

	albumResponse := controller.albumService.GetAlbumByTrack(idTrack)
	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   albumResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}

func (controller *AlbumController) GetAnotherAlbum(ctx *gin.Context) {
	idAlbum := ctx.Param("albumId")
	albumResponse := controller.albumService.GetAnotherAlbum(idAlbum)

	WebResponse := response.WebResponse{
		Code:   http.StatusOK,
		Status: "Ok",
		Data:   albumResponse,
	}

	ctx.JSON(http.StatusOK, WebResponse)
}
