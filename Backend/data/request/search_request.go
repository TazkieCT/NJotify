package request

type SearchRequest struct {
	Search string `validate:"required" json:"search"`
}
