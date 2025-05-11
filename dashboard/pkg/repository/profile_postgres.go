package repository

import (
	"dashboard"
	"fmt"

	"github.com/jmoiron/sqlx"
)

type ProfilePostgres struct {
	db *sqlx.DB
}

func NewProfilePostgres(db *sqlx.DB) *ProfilePostgres {
	return &ProfilePostgres{db: db}
}

func (r *ProfilePostgres) GetProfile(userId int) ([]dashboard.User, error) {
	var lists []dashboard.User
	query := fmt.Sprintf(`select * from "%s" where user_id = $1`,
		usersTable)
	err := r.db.Select(&lists, query, userId)

	return lists, err
}
