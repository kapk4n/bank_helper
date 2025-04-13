package repository

import (
	"dashboard"
	"fmt"

	"github.com/jmoiron/sqlx"
)

type EmployeePostgres struct {
	db *sqlx.DB
}

func NewEmployeePostgres(db *sqlx.DB) *EmployeePostgres {
	return &EmployeePostgres{db: db}
}

// Получить всех сотрудников
func (r *EmployeePostgres) GetAllEmployees() ([]dashboard.Employee, error) {
	var employees []dashboard.Employee
	query := fmt.Sprintf(`SELECT user_id, full_name, position, team, department, division FROM "%s"`, usersTable)
	fmt.Println(query)

	err := r.db.Select(&employees, query)
	if err != nil {
		fmt.Println("Ошибка выполнения запроса:", err)
		return nil, err
	}

	return employees, nil
}

// Получить сотрудника по ID
func (r *EmployeePostgres) GetEmployeeByID(id int) (dashboard.Employee, error) {
	var emp dashboard.Employee
	fmt.Println(id)
	query := fmt.Sprintf(`SELECT user_id, full_name, position, team, department, division FROM "%s" WHERE user_id = $1`, usersTable)
	fmt.Println(query)
	err := r.db.Get(&emp, query, id)
	if err != nil {
		fmt.Println("Ошибка выполнения запроса:", err)
		return dashboard.Employee{}, err
	}

	return emp, nil
}
