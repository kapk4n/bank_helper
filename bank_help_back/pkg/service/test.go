package service

import (
	"dashboard"
	"dashboard/pkg/repository"
)

type TestService struct {
	repo repository.Test
}

func NewTestService(repo repository.Test) *TestService {
	return &TestService{repo: repo}
}

func (s *TestService) GetTestById(input dashboard.Test, author_id int) ([]dashboard.Test, error) {
	return s.repo.GetTestById(input, author_id)
}

func (s *TestService) GetAllTests(input dashboard.Test, author_id int) ([]dashboard.Test, error) {
	return s.repo.GetAllTests(input, author_id)
}

func (s *TestService) GetAllAuthorTests(input dashboard.Test, author_id int) ([]dashboard.Test, error) {
	return s.repo.GetAllAuthorTests(input, author_id)
}

func (s *TestService) GetAllUserTests(author_id int) ([]dashboard.UserTests, error) {
	return s.repo.GetAllUserTests(author_id)
}

func (s *TestService) GetPercentTest(test_id, author_id int) ([]dashboard.Percentage, error) {
	return s.repo.GetPercentTest(test_id, author_id)
}

func (s *TestService) CreateTest(input dashboard.Test, author_id int) (int, error) {
	return s.repo.CreateTest(input, author_id)
}

func (s *TestService) CloseTest(input dashboard.Test, author_id int) error {
	return s.repo.CloseTest(input, author_id)
}

func (s *TestService) DeleteTest(input dashboard.Test, author_id int) error {
	return s.repo.DeleteTest(input, author_id)
}
