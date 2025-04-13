package dashboard

type User struct {
	Id        int    `json:"user_id" db:"user_id"`
	Login     string `json:"login" binding:"required"`
	Phone     string `json:"phone" binding:"required"`
	Password  string `json:"password" binding:"required"`
	Email     string `json:"email" binding:"required"`
	Status    string `json:"status" binding:"required"`
	FullName  string `json:"full_name" db:"full_name" binding:"required"`
	JobTittle string `json:"job_tittle" db:"job_tittle" binding:"required"`
	RoleId    string `json:"role_id" db:"role_id" binding:"required"`
}
