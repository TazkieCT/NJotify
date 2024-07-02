package response

type UserResponse struct {
	Id       string `json='id'`
	Email    string `json='email'`
	Password string `json='password'`
	Role     string `json='role'`
}
