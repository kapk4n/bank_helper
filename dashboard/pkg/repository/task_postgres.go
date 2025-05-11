package repository

import (
	"dashboard"
	"fmt"
	"strings"

	"github.com/jmoiron/sqlx"
)

type TaskPostgres struct {
	db *sqlx.DB
}

// type Priority int

// const (
// 	Low      Priority = iota + 1 // EnumIndex = 1
// 	Medium                       // EnumIndex = 2
// 	High                         // EnumIndex = 3
// 	VeryHigh                     // EnumIndex = 4
// )

// func (d Priority) String() string {
// 	return [...]string{"Low", "Medium", "High", "Very high"}[d-1]
// }

// // EnumIndex - Creating common behavior - give the type a EnumIndex functio
// func (d Priority) EnumIndex() int {
// 	return int(d)
// }

func enumIdent(data string) int {
	if data == "Low" {
		return 0
	}
	if data == "Medium" {
		return 1
	}
	if data == "High" {
		return 2
	}
	if data == "Very high" {
		return 3
	}
	return 1000
}

func enumUndent(data int) string {
	if data == 0 {
		return "Low"
	}
	if data == 1 {
		return "Medium"
	}
	if data == 2 {
		return "High"
	}
	if data == 3 {
		return "Very high"
	}
	return ""
}

func NewTaskPostgres(db *sqlx.DB) *TaskPostgres {
	return &TaskPostgres{db: db}
}

func (r *TaskPostgres) Create(list dashboard.Task, authorId int) (int, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	var task_id int

	query := fmt.Sprintf(`select "user_id" from "%s" where login = $1`,
		usersTable)
	err = r.db.Get(&list.EmployeeId, query, list.EmployeeLogin)
	if err != nil {
		return 0, err
	}
	fmt.Print(list.EmployeeId, list.EmployeeLogin)

	list.Priority = enumIdent(list.PriorityString)
	createTaskQuery := fmt.Sprintf(`INSERT INTO %s (start_date, title, description, priority, employee_id, author_id, status, desk_id) VALUES (CURRENT_DATE, $1, $2, $3, $4, $5, 'To Do', $6) RETURNING task_id`, taskTable)
	row := tx.QueryRow(createTaskQuery, list.Title, list.Description, list.Priority, list.EmployeeId, authorId, list.DeskId)
	if err := row.Scan(&task_id); err != nil {
		tx.Rollback()
		return 0, err
	}

	// var roomId int
	// createUsersRoomQuery := fmt.Sprintf("INSERT INTO %s (user_id, manager_id, privacy, desk_id) VALUES ($1, $2, '1', $3) RETURNING room_id", roomTable)
	// row = tx.QueryRow(createUsersRoomQuery, list.EmployeeId, authorId, list.DeskId)
	// if err := row.Scan(&roomId); err != nil {
	// 	tx.Rollback()
	// 	return 0, err
	// }

	return task_id, tx.Commit()
}

func (r *TaskPostgres) Update(list dashboard.UpdateTaskInput, taskId, authorId int) error {
	setValues := make([]string, 0)
	args := make([]interface{}, 0)
	argId := 1

	if list.Title != nil && *list.Title != `` {
		setValues = append(setValues, fmt.Sprintf("title=$%d", argId))
		args = append(args, *list.Title)
		argId++
	}

	if list.Description != nil && *list.Description != `` {
		setValues = append(setValues, fmt.Sprintf("description=$%d", argId))
		args = append(args, *list.Description)
		argId++
	}

	if list.Status != nil && *list.Status != `` {
		setValues = append(setValues, fmt.Sprintf("status=$%d", argId))
		args = append(args, *list.Status)
		argId++
	}

	if list.PriorityString != nil && *list.PriorityString != `` {
		setValues = append(setValues, fmt.Sprintf("priority=$%d", argId))
		args = append(args, enumIdent(*list.PriorityString))
		argId++
	}

	if list.EmployeeLogin != nil && *list.EmployeeLogin != `` {
		query := fmt.Sprintf(`select "user_id" from "%s" where login = $1`,
			usersTable)
		err := r.db.Get(&list.EmployeeId, query, list.EmployeeLogin)
		if err != nil {
			fmt.Print(list.EmployeeId, list.EmployeeLogin)
		}

		setValues = append(setValues, fmt.Sprintf("employee_id=$%d", argId))
		args = append(args, *list.EmployeeId)
		argId++
	}

	setQuery := strings.Join(setValues, ", ")

	query := fmt.Sprintf(`update %s set %s where task_id = %d`, taskTable, setQuery, taskId)
	args = append(args)

	// createUsersRoomQuery := fmt.Sprintf("INSERT INTO %s (user_id, manager_id, privacy, desk_id) VALUES ($1, $2, '1', $3) RETURNING room_id", roomTable)
	// row := tx.QueryRow(createUsersRoomQuery, userId, userId, deskId)

	_, err := r.db.Exec(query, args...)

	// if err == nil {
	// 	tx, err := r.db.Begin()
	// 	if err != nil {
	// 		return err
	// 	}

	// 	var desk2 []int
	// 	query := fmt.Sprintf(`select desk_id from "%s" t where task_id = $1`,
	// 		taskTable)
	// 	err = r.db.Select(&desk2, query, taskId)
	// 	desk_id := desk2[0]

	// 	print(desk_id)
	// 	var arr []int
	// 	query = fmt.Sprintf(`select employee_id from %s t where desk_id = $1`,
	// 		taskTable)
	// 	err = r.db.Select(&arr, query, desk_id)

	// 	var arr2 []int
	// 	query = fmt.Sprintf(`select manager_id from %s r where desk_id = $1`,
	// 		roomTable)
	// 	err = r.db.Select(&arr2, query, desk_id)

	// 	query = fmt.Sprintf("DELETE FROM %s WHERE desk_id = $1",
	// 		roomTable)
	// 	_, err = r.db.Exec(query, desk_id)

	// 	var room_id int
	// 	fmt.Print(len(arr))
	// 	for i := 0; i < len(arr); i++ {
	// 		createUsersRoomQuery := fmt.Sprintf(`INSERT INTO %s (user_id, manager_id, privacy, desk_id) VALUES ($1, $2, '1',$3)`, roomTable)
	// 		row := tx.QueryRow(createUsersRoomQuery, arr[i], arr2[0], desk_id)
	// 		fmt.Print(row)
	// 		if err := row.Scan(&room_id); err == nil {
	// 			tx.Rollback()
	// 			return err
	// 		}
	// 	}
	// tx.Commit()
	// }

	return err
}

func (r *TaskPostgres) Delete(task_id, authorId int) error {
	var author_id_select int
	query := fmt.Sprintf(`SELECT "author_id" FROM %s WHERE task_id = $1`,
		taskTable)
	err := r.db.Get(&author_id_select, query, task_id)

	if authorId == author_id_select {
		query := fmt.Sprintf("delete from %s where task_id = $1",
			commentTable)
		_, err := r.db.Exec(query, task_id)
		if err != nil {
			return err
		}

		query = fmt.Sprintf("DELETE FROM %s WHERE task_id = $1",
			taskTable)
		_, err = r.db.Exec(query, task_id)

		return err
	} else {
		return err
	}
}

func (r *TaskPostgres) GetAll(task_id, deskId int) ([]dashboard.TaskJoins, error) {
	var list []dashboard.TaskJoins
	query := fmt.Sprintf(`select task_id, desk_id, start_date, title, description, priority, employee_id, author_id, t.status, 
	u.login employee_login, u.email employee_email, u.phone employee_phone, 
	u2.login author_login, u2.email author_email, u2.phone author_phone
	from "%s" t inner join "%s" u on t.employee_id = u."user_id"
	inner join "%s" u2 on t.author_id  = u2."user_id"
	where desk_id = $1 order by priority desc, status`,
		taskTable, usersTable, usersTable)
	err := r.db.Select(&list, query, deskId)

	for i := 0; i < len(list); i++ {
		list[i].PriorityString = enumUndent(list[i].Priority)
	}

	return list, err
}

func (r *TaskPostgres) GetById(authorId, desk_id int) ([]dashboard.Task, error) {
	var list []dashboard.Task
	query := fmt.Sprintf("select * from %s where desk_id = $1 and employee_id = $2",
		taskTable)
	err := r.db.Select(&list, query, desk_id, authorId)

	for i := 0; i < len(list); i++ {
		list[i].PriorityString = enumUndent(list[i].Priority)
	}

	return list, err
}

func (r *TaskPostgres) GetTasksToDo(task_id, deskId int) ([]dashboard.TaskJoins, error) {
	var list []dashboard.TaskJoins
	query := fmt.Sprintf(`select task_id, desk_id, start_date, title, description, priority, employee_id, author_id, t.status, 
	u.login employee_login, u.email employee_email, u.phone employee_phone, 
	u2.login author_login, u2.email author_email, u2.phone author_phone
	from "%s" t inner join "%s" u on t.employee_id = u."user_id"
	inner join "%s" u2 on t.author_id  = u2."user_id"
	where desk_id = $1 and t.status = 'To Do'
	order by priority desc, status`,
		taskTable, usersTable, usersTable)
	err := r.db.Select(&list, query, deskId)

	for i := 0; i < len(list); i++ {
		list[i].PriorityString = enumUndent(list[i].Priority)
	}

	return list, err
}

func (r *TaskPostgres) GetTasksInWork(task_id, deskId int) ([]dashboard.TaskJoins, error) {
	var list []dashboard.TaskJoins
	query := fmt.Sprintf(`select task_id, desk_id, start_date, title, description, priority, employee_id, author_id, t.status, 
	u.login employee_login, u.email employee_email, u.phone employee_phone, 
	u2.login author_login, u2.email author_email, u2.phone author_phone
	from "%s" t inner join "%s" u on t.employee_id = u."user_id"
	inner join "%s" u2 on t.author_id  = u2."user_id"
	where desk_id = $1 and t.status = 'In Work'
	order by priority desc, status`,
		taskTable, usersTable, usersTable)
	err := r.db.Select(&list, query, deskId)

	for i := 0; i < len(list); i++ {
		list[i].PriorityString = enumUndent(list[i].Priority)
	}

	return list, err
}

func (r *TaskPostgres) GetTasksDone(task_id, deskId int) ([]dashboard.TaskJoins, error) {
	var list []dashboard.TaskJoins
	query := fmt.Sprintf(`select task_id, desk_id, start_date, title, description, priority, employee_id, author_id, t.status, 
	u.login employee_login, u.email employee_email, u.phone employee_phone, 
	u2.login author_login, u2.email author_email, u2.phone author_phone
	from "%s" t inner join "%s" u on t.employee_id = u."user_id"
	inner join "%s" u2 on t.author_id  = u2."user_id"
	where desk_id = $1 and t.status = 'Done'
	order by priority desc, status`,
		taskTable, usersTable, usersTable)
	err := r.db.Select(&list, query, deskId)

	for i := 0; i < len(list); i++ {
		list[i].PriorityString = enumUndent(list[i].Priority)
	}

	return list, err
}
