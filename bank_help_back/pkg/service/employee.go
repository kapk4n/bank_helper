package service

import (
	"dashboard"
	"dashboard/pkg/repository"
)

type EmployeeService struct {
	repo repository.Employee
}

func NewEmployeeService(repo repository.Employee) *EmployeeService {
	return &EmployeeService{repo: repo}
}

// Получение всех сотрудников
func (s *EmployeeService) GetAllEmployees() ([]dashboard.Employee, error) {
	return s.repo.GetAllEmployees()
}

// Получение сотрудника по ID
func (s *EmployeeService) GetEmployeeByID(id int) (dashboard.Employee, error) {
	return s.repo.GetEmployeeByID(id)
}
