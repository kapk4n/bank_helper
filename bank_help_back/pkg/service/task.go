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

func (s *TaskService) GetById(task_id int) ([]dashboard.Task, error) {
	return s.repo.GetById(task_id)
}

func (s *TaskService) GetAllTaskByTest(task_id, user_id int) ([]dashboard.Task, error) {
	return s.repo.GetAllTaskByTest(task_id, user_id)
}

func (s *TaskService) GetUserTaskResultById(test_id, author_id int) ([]dashboard.TestResult, error) {
	return s.repo.GetUserTaskResultById(test_id, author_id)
}

func (s *TaskService) GetUserTaskResultByTaskId(task_id, author_id int) ([]dashboard.TestResult, error) {
	return s.repo.GetUserTaskResultByTaskId(task_id, author_id)
}

func (s *TaskService) GetTaskVariants(test_id int) ([]dashboard.TaskVariants, error) {
	return s.repo.GetTaskVariants(test_id)
}

func (s *TaskService) GetMinTaskByTest(test_id int) ([]dashboard.MinTask, error) {
	return s.repo.GetMinTaskByTest(test_id)
}

func (s *TaskService) Create(list dashboard.TaskMerged) (int, error) {
	return s.repo.Create(list)
}

func (s *TaskService) CreateTaskResults(userId int, list dashboard.TaskResponse) (int, error) {
	return s.repo.CreateTaskResults(userId, list)
}

func (s *TaskService) Delete(task_id, user_id int) error {
	return s.repo.Delete(task_id, user_id)
}
