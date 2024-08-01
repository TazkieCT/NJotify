package request

type ResetPassword struct {
	ResetToken string `validate:"required" json:"reset_token"`
	Password   string `validate:"required" json:"password"`
}
