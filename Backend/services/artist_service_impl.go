package services

import (
	"github.com/TazkieCT/njotify/data/response"
	"github.com/TazkieCT/njotify/repository"
	"github.com/go-playground/validator/v10"
)

type ArtistServiceImpl struct {
	ArtistRepository repository.ArtistRepository
	Validate         *validator.Validate
}

func NewArtistServiceImpl(artistRepository repository.ArtistRepository, validate *validator.Validate) ArtistService {
	return &ArtistServiceImpl{
		ArtistRepository: artistRepository,
		Validate:         validate,
	}
}

func (r *ArtistServiceImpl) GetArtist(id string) response.ArtistResponse {
	artist := r.ArtistRepository.GetArtist(id)

	artistResponse := response.ArtistResponse{
		Name:        artist.User.Username,
		BannerImage: artist.BannerImage,
		About:       artist.About,
	}

	return artistResponse
}

func (r *ArtistServiceImpl) GetArtistByTrack(id string) response.ArtistByTrackResponse {
	artist := r.ArtistRepository.GetArtistByTrack(id)

	artistResponse := response.ArtistByTrackResponse{
		Id:          artist.UserId.String(),
		Name:        artist.User.Username,
		BannerImage: artist.BannerImage,
		About:       artist.About,
	}

	// fmt.Println(artistResponse.Name)
	// fmt.Println(artistResponse.About)
	// fmt.Println(artistResponse.BannerImage)

	return artistResponse
}
