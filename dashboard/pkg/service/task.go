package service

import (
	"dashboard"
	"dashboard/pkg/repository"
)

type TaskService struct {
	repo repository.Task
}

func NewTaskService(repo repository.Task) *TaskService {
	return &TaskService{repo: repo}
}

func (s *TaskService) Create(list dashboard.Task, authorId int) (int, error) {
	return s.repo.Create(list, authorId)
}

func (s *TaskService) Update(list dashboard.UpdateTaskInput, taskId, authorId int) error {
	return s.repo.Update(list, taskId, authorId)
}

func (s *TaskService) Delete(task_id, authorId int) error {
	return s.repo.Delete(task_id, authorId)
}

func (s *TaskService) GetAll(task_id, deskId int) ([]dashboard.TaskJoins, error) {
	return s.repo.GetAll(task_id, deskId)
}

func (s *TaskService) GetById(task_id, authorId int) ([]dashboard.Task, error) {
	return s.repo.GetById(task_id, authorId)
}

func (s *TaskService) GetTasksToDo(task_id, deskId int) ([]dashboard.TaskJoins, error) {
	return s.repo.GetTasksToDo(task_id, deskId)
}

func (s *TaskService) GetTasksInWork(task_id, deskId int) ([]dashboard.TaskJoins, error) {
	return s.repo.GetTasksInWork(task_id, deskId)
}

func (s *TaskService) GetTasksDone(task_id, deskId int) ([]dashboard.TaskJoins, error) {
	return s.repo.GetTasksDone(task_id, deskId)
}
