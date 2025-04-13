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

func (r *ProfilePostgres) GetGroups(userId int) ([]dashboard.ConGroupsJoin, error) {
	var lists []dashboard.ConGroupsJoin
	query := fmt.Sprintf(`select distinct g.group_id, group_name, con_group_user_id, user_id from "%s" g 
				inner join "%s" cgu on cgu.group_id = g.group_id
				where cgu.user_id = $1`,
		groupsTable, conGroupsTable)
	err := r.db.Select(&lists, query, userId)

	return lists, err
}
