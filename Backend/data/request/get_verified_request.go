package request

type GetVerifiedUser struct {
	UserId string `validate:"required" json:"user_id"`
	Banner []byte `validate:"required" form:"banner"`
	About  string `validate:"required" json:"about"`
}
