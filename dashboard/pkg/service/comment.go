package service

import (
	"dashboard"
	"dashboard/pkg/repository"
)

type CommentService struct {
	repo repository.Comment
}

func NewCommentService(repo repository.Comment) *CommentService {
	return &CommentService{repo: repo}
}

func (s *CommentService) Create(userId int, list dashboard.Comment) (int, error) {
	return s.repo.Create(userId, list)
}

// func (s *DeskService) GetAll(userId int) ([]dashboard.Desk, error) {
// 	return s.repo.GetAll(userId)
// }

// func (s *DeskService) GetById(userId, listId int) (dashboard.Desk, error) {
// 	return s.repo.GetById(userId, listId)
// }

func (s *CommentService) Delete(userId, deskId int) error {
	return s.repo.Delete(userId, deskId)
}

// func (s *CommentService) Update(userId, deskId int, input dashboard.UpdateDeskInput) error {
// 	if err := input.Validate(); err != nil {
// 		return err
// 	}
// 	return s.repo.Update(userId, deskId, input)
// }
