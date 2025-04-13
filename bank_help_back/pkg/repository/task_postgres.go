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

func NewTaskPostgres(db *sqlx.DB) *TaskPostgres {
	return &TaskPostgres{db: db}
}

func (r *TaskPostgres) GetById(task_id int) ([]dashboard.Task, error) {
	var list []dashboard.Task
	query := fmt.Sprintf("select * from %s where task_id = $1",
		taskTable)

	err := r.db.Select(&list, query, task_id)
	fmt.Println(err)

	return list, err
}

func (r *TaskPostgres) GetMinTaskByTest(tesk_id int) ([]dashboard.MinTask, error) {
	var list []dashboard.MinTask
	query := fmt.Sprintf("select min(task_id) from %s where test_id = $1",
		taskTable)

	err := r.db.Select(&list, query, tesk_id)
	fmt.Println(err)

	return list, err
}

func (r *TaskPostgres) GetAllTaskByTest(test_id, user_id int) ([]dashboard.Task, error) {
	var list []dashboard.Task
	var tests dashboard.Test

	query := fmt.Sprintf(`select t.test_id from %s t
	where t.test_id = $1 and t.group_id in (select cgu.group_id from %s cgu where cgu.user_id = $2)`,
		testTable, conGroupsTable)
	err := r.db.Get(&tests, query, test_id, user_id)

	if tests.TestId == 0 {
		fmt.Println(err)
		return list, err
	}

	query = fmt.Sprintf(`select t.task_id, t.task_question, t.test_id  from %s t
						inner join %s t2 on t2.test_id = t.test_id 
						where t.test_id = $1 and t2.group_id in (select cgu.group_id from %s cgu where cgu.user_id = $2)
						order by task_id`,
		taskTable, testTable, conGroupsTable)

	err = r.db.Select(&list, query, test_id, user_id)
	fmt.Println(err)

	return list, err
}

func (r *TaskPostgres) GetTaskVariants(task_id int) ([]dashboard.TaskVariants, error) {
	var list []dashboard.TaskVariants
	query := fmt.Sprintf("select * from %s tv where task_id = $1",
		taskVariant)

	err := r.db.Select(&list, query, task_id)
	fmt.Println(err)

	return list, err
}

func (r *TaskPostgres) GetUserTaskResultById(test_id, author_id int) ([]dashboard.TestResult, error) {
	var list []dashboard.TestResult
	var tests dashboard.Test

	query := fmt.Sprintf(`select t.test_id from %s t
	where t.test_id = $1 and t.group_id in (select cgu.group_id from %s cgu where cgu.user_id = $2)`,
		testTable, conGroupsTable)
	err := r.db.Get(&tests, query, test_id, author_id)
	if tests.TestId == 0 {
		fmt.Println(err)
		return list, err
	}

	query = fmt.Sprintf(`select tests_result_id, tr.user_id, tr.task_id, answer_result, 
													answer_correct, task_question, t2.test_id, 
													test_title, test_category, author_id, t2.group_id, begindate, enddate
												from %s tr 
												inner join %s t on t.task_id = tr.task_id 
												inner join %s t2 on t2.test_id = t.test_id 
												where tr.user_id = $1 and t.test_id = $2 and tr.tests_result_id  in 
														(select tests_result_id from tests_result tr
														inner join (
																select task_id, max(result_date) AS result_date
																from tests_result
																group by task_id
														) as qwe on qwe.task_id = tr.task_id 
														where qwe.result_date = tr.result_date )`,
		testResultTable, taskTable, testTable)

	err = r.db.Select(&list, query, author_id, test_id)
	fmt.Println(err)

	return list, err
}

func (r *TaskPostgres) GetUserTaskResultByTaskId(task_id, author_id int) ([]dashboard.TestResult, error) {
	var list []dashboard.TestResult
	query := fmt.Sprintf(`select tests_result_id, chosen_variant, tr.user_id, tr.task_id, answer_result, 
													answer_correct, task_question, t2.test_id, 
													test_title, test_category, author_id, t2.group_id, begindate, enddate
												from %s tr 
												inner join %s t on t.task_id = tr.task_id 
												inner join %s t2 on t2.test_id = t.test_id 
												inner join task_variants tv on tv.task_variants_id = chosen_variant 
												where tr.user_id = $1 and t.task_id = $2 and tr.result_date  = 
															(select max(tr2.result_date) from tests_result tr2 where tr2.task_id = $2)`,
		testResultTable, taskTable, testTable)

	fmt.Println(author_id, task_id)
	err := r.db.Select(&list, query, author_id, task_id)
	fmt.Println(err)

	return list, err
}

func (r *TaskPostgres) Create(list dashboard.TaskMerged) (int, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	var task_id, task_variants_id int
	// fmt.Println(list)

	createTaskQuery := fmt.Sprintf(`INSERT INTO %s (task_question, test_id) VALUES ($1, $2) RETURNING task_id`, taskTable)
	row := tx.QueryRow(createTaskQuery, list.TaskQuestion, list.TestId)
	if err := row.Scan(&task_id); err != nil {
		tx.Rollback()
		return 0, err
	}

	fmt.Println(len(strings.Split(list.TaskVariant, "±")))
	var tr bool
	for i := 0; i < len(strings.Split(list.TaskVariant, "±")); i++ {
		if strings.Split(list.TaskVariant, "±")[i] == list.CorrectVariant {
			tr = true
		} else {
			tr = false
		}
		createTaskQuery = fmt.Sprintf(`INSERT INTO %s (task_id, task_variant, correct_variant)
																			VALUES ($1, $2, $3) RETURNING task_variants_id`, taskVariant)
		row = tx.QueryRow(createTaskQuery, task_id, strings.Split(list.TaskVariant, "±")[i], tr)
		if err := row.Scan(&task_variants_id); err != nil {
			tx.Rollback()
			return 0, err
		}
	}

	return task_variants_id, tx.Commit()
}

func (r *TaskPostgres) CreateTaskResults(userId int, list dashboard.TaskResponse) (int, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}
	var task_var_id int
	var truth_check bool

	for i := 0; i < len(list.Responses); i++ {
		var taskVariants dashboard.TaskVariants
		variant_id := list.Responses[i].IDTaskVariant
		fmt.Println(err)
		if err != nil {
			return 0, err
		}

		query := fmt.Sprintf(`select * from %s tv where tv.task_variants_id = $1`,
			taskVariant)
		err = r.db.Get(&taskVariants, query, variant_id)

		truth_check = taskVariants.CorrectVariant
		fmt.Println(err)

		createTaskQuery := fmt.Sprintf(`INSERT INTO %s (user_id, task_id, 
																			answer_result, answer_correct, chosen_variant, result_date) 
																			VALUES ($1, $2, $3, $4, $5, current_timestamp) RETURNING task_id`, testResultTable)
		row := tx.QueryRow(createTaskQuery, userId, list.Responses[i].IDTask, taskVariants.TaskVariant, truth_check, list.Responses[i].IDTaskVariant)
		if err := row.Scan(&task_var_id); err != nil {
			tx.Rollback()
			return 0, err
		}
	}

	return task_var_id, tx.Commit()
}

func (r *TaskPostgres) Delete(task_id, authorId int) error {
	// var author_id_select int
	// query := fmt.Sprintf(`SELECT "author_id" FROM %s WHERE task_id = $1`,
	// 	taskTable)
	// err := r.db.Get(&author_id_select, query, task_id)

	// if err != nil {
	query := fmt.Sprintf(`DELETE FROM %s WHERE task_id = $1`,
		taskTable)
	_, err := r.db.Exec(query, task_id)

	return err
	// } else {
	// 	return err
	// }
}
