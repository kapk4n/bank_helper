package service

import (
	"dashboard"
	"dashboard/pkg/repository"
	"io"
)

type LibraryService struct {
	repo repository.Library
}

func NewLibraryService(repo repository.Library) *LibraryService {
	return &LibraryService{repo: repo}
}

func (s *LibraryService) GetAllSections() ([]dashboard.Section, error) {
	return s.repo.GetAllSections()
}
func (s *LibraryService) GetArticlesBySection(sectionID int) ([]dashboard.Article, error) {
	return s.repo.GetArticlesBySection(sectionID)
}
func (s *LibraryService) GetArticleByID(articleID int) (dashboard.Article, error) {
	return s.repo.GetArticleByID(articleID)
}
func (s *LibraryService) CreateSection(list dashboard.Section, author_id int) (int, error) {
	return s.repo.CreateSection(list, author_id)
}
func (s *LibraryService) CreateArticle(input dashboard.Article) (int, error) {
	return s.repo.CreateArticle(input)
}
func (s *LibraryService) CreateFileArticle(filename string, file io.Reader, article_id, section_id int) error {
	return s.repo.CreateFileArticle(filename, file, article_id, section_id)
}
func (s *LibraryService) GetFileList(sectionID, articleID int) ([]string, error) {
	return s.repo.GetFileList(sectionID, articleID)
}
func (s *LibraryService) DownloadFile(sectionID, articleID int, fileName string) (string, error) {
	return s.repo.DownloadFile(sectionID, articleID, fileName)
}
func (s *LibraryService) CreateWordArticle(list dashboard.WordArticle, articleID int) (int, error) {
	return s.repo.CreateWordArticle(list, articleID)
}
func (s *LibraryService) GetWordArticle(articleID int) ([]dashboard.WordArticle, error) {
	return s.repo.GetWordArticle(articleID)
}
