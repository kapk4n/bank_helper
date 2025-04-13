package repository

import (
	"dashboard"
	"fmt"

	"github.com/jmoiron/sqlx"
)

type TodoPostgres struct {
	db *sqlx.DB
}

func NewTodoPostgres(db *sqlx.DB) *TodoPostgres {
	return &TodoPostgres{db: db}
}

func (r *TodoPostgres) GetById(todo_id int) ([]dashboard.Todo, error) {
	var list []dashboard.Todo
	query := fmt.Sprintf("select * from %s",
		todoTable)

	err := r.db.Select(&list, query)
	fmt.Println(err)

	return list, err
}

func (r *TodoPostgres) GetAllAuthorTodos(todo_id int) ([]dashboard.Todo, error) {
	var list []dashboard.Todo
	query := fmt.Sprintf("select * from %s where user_id = $1",
		todoTable)

	err := r.db.Select(&list, query, todo_id)
	fmt.Println(err)

	return list, err
}

func (r *TodoPostgres) GetInWorkTodos(todo_id int) ([]dashboard.Todo, error) {
	var list []dashboard.Todo
	query := fmt.Sprintf("select * from %s where user_id = $1 and status = 'In Work'",
		todoTable)

	err := r.db.Select(&list, query, todo_id)
	fmt.Println(err)

	return list, err
}

func (r *TodoPostgres) GetFinishedTodos(todo_id int) ([]dashboard.Todo, error) {
	var list []dashboard.Todo
	query := fmt.Sprintf("select * from %s where user_id = $1 and status = 'Completed'",
		todoTable)

	err := r.db.Select(&list, query, todo_id)
	fmt.Println(err)

	return list, err
}

func (r *TodoPostgres) CreateTodo(input dashboard.Todo, author_id int) (int, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	var todo_id int

	createTestQuery := fmt.Sprintf(`insert into %s (start_date, title, description, priority, user_id, status)
	VALUES (CURRENT_DATE, $1, $2, $3, $4, 'In Work') RETURNING todo_id`, todoTable)
	row := tx.QueryRow(createTestQuery, input.Title, input.Description, input.Priority, author_id)
	if err := row.Scan(&todo_id); err != nil {
		tx.Rollback()
		return 0, err
	}

	return todo_id, tx.Commit()
}
