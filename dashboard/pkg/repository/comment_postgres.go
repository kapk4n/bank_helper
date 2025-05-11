package repository

import (
	"dashboard"
	"fmt"

	"github.com/jmoiron/sqlx"
)

type CommentPostgres struct {
	db *sqlx.DB
}

func NewCommentPostgres(db *sqlx.DB) *CommentPostgres {
	return &CommentPostgres{db: db}
}

func (r *CommentPostgres) Create(authorId int, list dashboard.Comment) (int, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	var task_id int

	createTaskQuery := fmt.Sprintf(`INSERT INTO %s (task_id, post_date, comment_author_id, message) VALUES ($1, CURRENT_DATE, $2, $3) RETURNING task_id`, commentTable)
	row := tx.QueryRow(createTaskQuery, list.TaskId, authorId, list.Message)
	if err := row.Scan(&task_id); err != nil {
		tx.Rollback()
		return 0, err
	}

	return task_id, tx.Commit()
}

// func (r *TaskPostgres) Update(list dashboard.UpdateTaskInput, taskId, authorId int) error {

// 	setValues := make([]string, 0)
// 	args := make([]interface{}, 0)
// 	argId := 1

// 	if list.Title != nil {
// 		setValues = append(setValues, fmt.Sprintf("title=$%d", argId))
// 		args = append(args, *list.Title)
// 		argId++
// 	}

// 	if list.Description != nil {
// 		setValues = append(setValues, fmt.Sprintf("description=$%d", argId))
// 		args = append(args, *list.Description)
// 		argId++
// 	}

// 	if list.Status != nil {
// 		setValues = append(setValues, fmt.Sprintf("status=$%d", argId))
// 		args = append(args, *list.Status)
// 		argId++
// 	}

// 	if list.Priority != nil {
// 		setValues = append(setValues, fmt.Sprintf("priority=$%d", argId))
// 		args = append(args, *list.Priority)
// 		argId++
// 	}

// 	setQuery := strings.Join(setValues, ", ")

// 	query := fmt.Sprintf(`update %s set %s where task_id = %d`, taskTable, setQuery, taskId)
// 	args = append(args)

// 	_, err := r.db.Exec(query, args...)
// 	return err
// }

func (r *CommentPostgres) Delete(comment_id, authorId int) error {
	// var author_id_select int
	// query := fmt.Sprintf(`SELECT "author_id" FROM %s WHERE task_id = $1`,
	// 	taskTable)
	// err := r.db.Get(&author_id_select, query, task_id)

	query := fmt.Sprintf("delete from %s where comment_id = $1 and comment_author_id = $2",
		commentTable)
	_, err := r.db.Exec(query, comment_id, authorId)
	return err
}
