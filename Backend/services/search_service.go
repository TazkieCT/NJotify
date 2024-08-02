package services

import "github.com/TazkieCT/njotify/data/response"

type SearchService interface {
	Search(search string) response.SearchResponse
}
