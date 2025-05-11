package repository

import (
	"dashboard"
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
)

type AuthPostgres struct {
	db *sqlx.DB
}

func NewAuthPostgres(db *sqlx.DB) *AuthPostgres {
	return &AuthPostgres{db: db}
}

func (r *AuthPostgres) CreateUser(user dashboard.User) (int, error) {
	var id int
	query := fmt.Sprintf(`INSERT INTO "%s" (login, password, email, phone, status) values ($1, $2, $3, $4, $5) RETURNING "user_id"`, usersTable)
	row := r.db.QueryRow(query, user.Login, user.Password, user.Email, user.Phone, user.Status)
	if err := row.Scan(&id); err != nil {
		return 0, err
	}
	return id, nil
}

func (r *AuthPostgres) GetUser(login, password string) (dashboard.User, error) {
	var user dashboard.User
	query := fmt.Sprintf(`SELECT user_id FROM "%s" WHERE login=$1 AND password=$2`, usersTable)
	log.Printf(query, login, password)
	err := r.db.Get(&user, query, login, password)

	return user, err
}

// func (r *AuthPostgres) GetAll(login, password string) ([]dashboard.User, error) {
// 	var user []dashboard.User
// 	query := fmt.Sprintf(`SELECT * from %s`, usersTable)
// 	log.Printf(query, login, password)
// 	err := r.db.Get(&user, query, login, password)

// 	return user, err
// }
