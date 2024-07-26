package response

import (
	"github.com/google/uuid"
)

type UserVerifiedResponse struct {
	Id       uuid.UUID `json='id'`
	Username string    `json:"username,omitEmpty"`
	Role     string    `json:"role"`
}
