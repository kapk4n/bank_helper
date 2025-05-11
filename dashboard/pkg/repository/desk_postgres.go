package repository

import (
	"dashboard"
	"fmt"
	"strings"

	"github.com/jmoiron/sqlx"
)

type DeskPostgres struct {
	db *sqlx.DB
}

func NewDeskPostgeres(db *sqlx.DB) *DeskPostgres {
	return &DeskPostgres{db: db}
}

func (r *DeskPostgres) Create(userId int, list dashboard.Desk) (int, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	var deskId int
	createListQuery := fmt.Sprintf("INSERT INTO %s (description, start_date, title, changeable) VALUES ($1, CURRENT_DATE, $2, $3) RETURNING desk_id", deskTable)
	row := tx.QueryRow(createListQuery, list.Description, list.Title, list.Changeable)
	if err := row.Scan(&deskId); err != nil {
		tx.Rollback()
		return 0, err
	}

	var roomId int
	createUsersRoomQuery := fmt.Sprintf("INSERT INTO %s (user_id, manager_id, privacy, desk_id) VALUES ($1, $2, '1', $3) RETURNING room_id", roomTable)
	row = tx.QueryRow(createUsersRoomQuery, userId, userId, deskId)
	if err := row.Scan(&roomId); err != nil {
		tx.Rollback()
		return 0, err
	}

	return deskId, tx.Commit()
}

func (r *DeskPostgres) Delete(userId, deskId int) error {
	query := fmt.Sprintf("delete from %s where task_id in (select task_id  from %s where desk_id = $1)",
		commentTable, taskTable)
	_, err := r.db.Exec(query, deskId)
	if err != nil {
		return err
	}

	query = fmt.Sprintf("DELETE FROM %s WHERE desk_id = $1",
		roomTable)
	_, err = r.db.Exec(query, deskId)
	if err != nil {
		return err
	}

	query = fmt.Sprintf("DELETE FROM %s WHERE desk_id = $1",
		taskTable)
	_, err = r.db.Exec(query, deskId)
	if err != nil {
		return err
	}

	query = fmt.Sprintf("DELETE FROM %s WHERE desk_id = $1",
		deskTable)
	_, err = r.db.Exec(query, deskId)

	return err
}

func (r *DeskPostgres) GetAll(userId int) ([]dashboard.Desk, error) {
	var lists []dashboard.Desk
	query := fmt.Sprintf("select * from %s where desk_id in (select desk_id from %s where user_id = $1)",
		deskTable, roomTable)
	err := r.db.Select(&lists, query, userId)

	return lists, err
}

func (r *DeskPostgres) GetById(userId, deskId int) (dashboard.Desk, error) {
	var list dashboard.Desk
	query := fmt.Sprintf("select * from %s where desk_id = $1",
		deskTable)
	err := r.db.Get(&list, query, deskId)

	return list, err
}

func (r *DeskPostgres) Update(userId, deskId int, input dashboard.UpdateDeskInput) error {
	setValues := make([]string, 0)
	args := make([]interface{}, 0)
	argId := 1

	if input.Title != nil {
		setValues = append(setValues, fmt.Sprintf("title=$%d", argId))
		args = append(args, *input.Title)
		argId++
	}

	if input.Description != nil {
		setValues = append(setValues, fmt.Sprintf("description=$%d", argId))
		args = append(args, *input.Description)
		argId++
	}

	if input.Changeable != nil {
		setValues = append(setValues, fmt.Sprintf("changeable=$%d", argId))
		args = append(args, *input.Changeable)
		argId++
	}

	setQuery := strings.Join(setValues, ", ")

	query := fmt.Sprintf(`update %s set %s where desk_id = %d`, deskTable, setQuery, deskId)
	args = append(args)

	_, err := r.db.Exec(query, args...)
	return err
}
