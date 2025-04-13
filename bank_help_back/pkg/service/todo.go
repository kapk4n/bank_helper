package service

import (
	"dashboard"
	"dashboard/pkg/repository"
)

type TodoService struct {
	repo repository.Todo
}

func NewTodoService(repo repository.Todo) *TodoService {
	return &TodoService{repo: repo}
}

func (s *TodoService) GetById(todo_id int) ([]dashboard.Todo, error) {
	return s.repo.GetById(todo_id)
}

func (s *TodoService) GetAllAuthorTodos(todo_id int) ([]dashboard.Todo, error) {
	return s.repo.GetAllAuthorTodos(todo_id)
}

func (s *TodoService) GetInWorkTodos(todo_id int) ([]dashboard.Todo, error) {
	return s.repo.GetInWorkTodos(todo_id)
}

func (s *TodoService) GetFinishedTodos(todo_id int) ([]dashboard.Todo, error) {
	return s.repo.GetFinishedTodos(todo_id)
}

func (s *TodoService) CreateTodo(input dashboard.Todo, author_id int) (int, error) {
	return s.repo.CreateTodo(input, author_id)
}
