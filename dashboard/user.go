package dashboard

type User struct {
	Id       int    `json:"user_id" db:"user_id"`
	Login    string `json:"login" binding:"required"`
	Phone    string `json:"phone" binding:"required"`
	Password string `json:"password" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Status   string `json:"status" binding:"required"`
}
