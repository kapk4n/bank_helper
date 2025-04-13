package repository

import (
	"dashboard"
	"fmt"

	"github.com/jmoiron/sqlx"
)

type TestPostgres struct {
	db *sqlx.DB
}

func NewTestPostgres(db *sqlx.DB) *TestPostgres {
	return &TestPostgres{db: db}
}

func (r *TestPostgres) GetTestById(input dashboard.Test, test_id int) ([]dashboard.Test, error) {
	var list []dashboard.Test
	query := fmt.Sprintf("select * from %s where test_id = $1",
		testTable)

	err := r.db.Select(&list, query, test_id)
	fmt.Println(err)

	return list, err
}

func (r *TestPostgres) GetAllTests(input dashboard.Test, test_id int) ([]dashboard.Test, error) {
	var list []dashboard.Test
	query := fmt.Sprintf("select * from %s where test_id = $1",
		testTable)

	err := r.db.Select(&list, query, test_id)
	fmt.Println(err)

	return list, err
}

func (r *TestPostgres) GetAllAuthorTests(input dashboard.Test, author_id int) ([]dashboard.Test, error) {
	var list []dashboard.Test
	query := fmt.Sprintf("select * from %s where author_id = $1",
		testTable)
	err := r.db.Select(&list, query, author_id)
	fmt.Println(err)

	return list, err
}

func (r *TestPostgres) GetAllUserTests(author_id int) ([]dashboard.UserTests, error) {
	var list []dashboard.UserTests
	query := fmt.Sprintf(`select test_id, test_title, test_category, author_id, begindate, enddate, user_id, t.group_id  
												from %s t 
												inner join %s g ON g.group_id = t.group_id 
												where g.user_id = $1`, testTable, conGroupsTable)
	err := r.db.Select(&list, query, author_id)
	fmt.Println(err)

	return list, err
}

func (r *TestPostgres) GetPercentTest(test_id, author_id int) ([]dashboard.Percentage, error) {
	var list []dashboard.Percentage
	query := fmt.Sprintf(`select ((
											select count(*) from %s tr 
											inner join %s t on t.task_id = tr.task_id 
											where tr.user_id = $1 and t.test_id = $2 and answer_correct = true and tr.tests_result_id  in 
														(select tests_result_id from tests_result tr
														inner join (
																select task_id, max(result_date) AS result_date
																from tests_result
																group by task_id
														) as qwe on qwe.task_id = tr.task_id 
														where qwe.result_date = tr.result_date )
											)::NUMERIC/(
											select count(*) from %s tr 
											inner join %s t on t.task_id = tr.task_id 
											where tr.user_id = $1 and t.test_id = $2 and tr.tests_result_id  in 
														(select tests_result_id from tests_result tr
														inner join (
																select task_id, max(result_date) AS result_date
																from tests_result
																group by task_id
														) as qwe on qwe.task_id = tr.task_id 
														where qwe.result_date = tr.result_date )  ) *100) as num`,
		testResultTable, taskTable, testResultTable, taskTable)

	err := r.db.Select(&list, query, author_id, test_id)
	fmt.Println(err)

	return list, err
}

func (r *TestPostgres) CreateTest(input dashboard.Test, author_id int) (int, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	var test_id int

	createTestQuery := fmt.Sprintf(`insert into %s (test_title, test_category, author_id, group_id, begindate, enddate)
	VALUES ($1, $2, $3, $4, CURRENT_DATE, $5) RETURNING test_id`, testTable)
	row := tx.QueryRow(createTestQuery, input.TestTitle, input.TestCategory, author_id, input.GroupId, input.Enddate)
	if err := row.Scan(&test_id); err != nil {
		tx.Rollback()
		return 0, err
	}

	// query := fmt.Sprintf(`select "user_id" from "%s" where login = $1`,
	// 	usersTable)
	// err = r.db.Get(&input.AuthorId, query, input.GroupId)
	// if err != nil {
	// 	return 0, err
	// }

	// input.Priority = enumIdent(input.PriorityString)
	// createTestQuery := fmt.Sprintf(`INSERT INTO %s (start_date, title, description, priority, employee_id, author_id, status, desk_id) VALUES (CURRENT_DATE, $1, $2, $3, $4, $5, 'To Do', $6) RETURNING test_id`, taskTable)
	// row := tx.QueryRow(createTestQuery, input.Title, input.Description, input.Priority, input.EmployeeId, authorId, input.DeskId)
	// if err := row.Scan(&test_id); err != nil {
	// 	tx.Rollback()
	// 	return 0, err
	// }

	// var roomId int
	// createUsersRoomQuery := fmt.Sprintf("INSERT INTO %s (user_id, manager_id, privacy, desk_id) VALUES ($1, $2, '1', $3) RETURNING room_id", roomTable)
	// row = tx.QueryRow(createUsersRoomQuery, input.EmployeeId, authorId, input.DeskId)
	// if err := row.Scan(&roomId); err != nil {
	// 	tx.Rollback()
	// 	return 0, err
	// }

	return test_id, tx.Commit()
}

func (r *TestPostgres) CloseTest(input dashboard.Test, author_id int) error {
	var list []dashboard.Test
	query := fmt.Sprintf("select * from %s where test_id = $1",
		testTable)

	err := r.db.Select(&list, query, author_id)
	fmt.Println(err)

	return err
}

func (r *TestPostgres) DeleteTest(input dashboard.Test, author_id int) error {
	var list []dashboard.Test
	query := fmt.Sprintf("select * from %s where test_id = $1",
		testTable)

	err := r.db.Select(&list, query, author_id)
	fmt.Println(err)

	return err
}
