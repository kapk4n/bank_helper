package repository

import (
	"dashboard"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"

	"github.com/jmoiron/sqlx"
)

type LibraryPostgres struct {
	db *sqlx.DB
}

func NewLibraryPostgres(db *sqlx.DB) *LibraryPostgres {
	return &LibraryPostgres{db: db}
}

// Получить все разделы библиотеки
func (r *LibraryPostgres) GetAllSections() ([]dashboard.Section, error) {

	var sections []dashboard.Section
	query := fmt.Sprintf("SELECT * FROM %s", sectionsTable)

	err := r.db.Select(&sections, query)
	return sections, err
}

// Получить все статьи по разделу
func (r *LibraryPostgres) GetArticlesBySection(sectionID int) ([]dashboard.Article, error) {
	var articles []dashboard.Article
	query := fmt.Sprintf("SELECT * FROM %s WHERE section_id = $1", articlesTable)

	err := r.db.Select(&articles, query, sectionID)
	return articles, err
}

// Получить статью по ID
func (r *LibraryPostgres) GetArticleByID(articleID int) (dashboard.Article, error) {
	var article dashboard.Article
	query := "SELECT * FROM articles WHERE id = $1"

	err := r.db.Get(&article, query, articleID)
	return article, err
}

// Создать новый раздел
func (r *LibraryPostgres) CreateSection(list dashboard.Section, author_id int) (int, error) {
	var sectionID int
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	createTaskQuery := fmt.Sprintf(`INSERT INTO %s (title, content, author_id, created_at, updated_at) VALUES ($1, $2, $3, current_timestamp, current_timestamp) RETURNING sections_id`, sectionsTable)
	row := tx.QueryRow(createTaskQuery, list.Title, list.Content, author_id)
	if err := row.Scan(&sectionID); err != nil {
		tx.Rollback()
		return 0, err
	}

	return sectionID, tx.Commit()

	// err := r.db.QueryRow(query, title).Scan(&sectionID)
	// return sectionID, err
}

// Создать новую статью в разделе
func (r *LibraryPostgres) CreateArticle(list dashboard.Article) (int, error) {
	var articleID int
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	createTaskQuery := fmt.Sprintf(`INSERT INTO %s (title, content, section_id) VALUES ($1, $2, $3) RETURNING articles_id`, articlesTable)
	row := tx.QueryRow(createTaskQuery, list.Title, list.Content, list.SectionID)
	if err := row.Scan(&articleID); err != nil {
		tx.Rollback()
		return 0, err
	}

	return articleID, tx.Commit()
}

func (r *LibraryPostgres) CreateFileArticle(filename string, file io.Reader, articleID, sectionID int) error {
	uploadDir := "uploads"
	sectionPath := filepath.Join(uploadDir, fmt.Sprint(sectionID))
	articlePath := filepath.Join(sectionPath, fmt.Sprint(articleID))
	filePath := filepath.Join(articlePath, filename)

	// Создаём директории, если их нет
	if err := os.MkdirAll(articlePath, os.ModePerm); err != nil {
		return fmt.Errorf("ошибка создания директории: %w", err)
	}

	// Проверяем, существует ли файл
	if _, err := os.Stat(filePath); err == nil {
		return fmt.Errorf("файл уже существует: %s", filename)
	}

	// Создаём новый файл
	dst, err := os.Create(filePath)
	if err != nil {
		return fmt.Errorf("ошибка создания файла: %w", err)
	}
	defer dst.Close()

	// Копируем содержимое файла
	if _, err = io.Copy(dst, file); err != nil {
		return fmt.Errorf("ошибка копирования файла: %w", err)
	}

	return nil
}

func (r *LibraryPostgres) GetFileList(sectionID, articleID int) ([]string, error) {
	uploadDir := "uploads"
	sectionPath := filepath.Join(uploadDir, fmt.Sprint(sectionID))
	articlePath := filepath.Join(sectionPath, fmt.Sprint(articleID))

	// Проверяем, существует ли директория
	if _, err := os.Stat(articlePath); os.IsNotExist(err) {
		return nil, fmt.Errorf("папка для статьи не найдена: %s", articlePath)
	}

	// Читаем содержимое директории
	files, err := ioutil.ReadDir(articlePath)
	if err != nil {
		return nil, fmt.Errorf("ошибка чтения директории: %w", err)
	}

	var fileNames []string
	for _, file := range files {
		if !file.IsDir() { // Игнорируем папки
			fileNames = append(fileNames, file.Name())
		}
	}

	return fileNames, nil
}

func (r *LibraryPostgres) DownloadFile(sectionID, articleID int, fileName string) (string, error) {
	uploadDir := "uploads"
	sectionPath := filepath.Join(uploadDir, fmt.Sprint(sectionID))
	articlePath := filepath.Join(sectionPath, fmt.Sprint(articleID))
	filePath := filepath.Join(articlePath, fileName)

	// Проверяем, существует ли файл
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return "", fmt.Errorf("файл не найден: %s", filePath)
	}

	return filePath, nil
}

func (r *LibraryPostgres) CreateWordArticle(list dashboard.WordArticle, articleID int) (int, error) {
	var articleWordID int
	var articlesWord []dashboard.WordArticle

	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	fmt.Println(list.Title, list.Content, articleID)

	query := fmt.Sprintf("SELECT * FROM %s WHERE articles_id = $1", articlesWordTable)
	err = r.db.Select(&articlesWord, query, articleID)

	if articlesWord == nil {
		createTaskQuery := fmt.Sprintf(`INSERT INTO %s (title, content, articles_id) VALUES ($1, $2, $3) RETURNING articles_id`, articlesWordTable)
		row := tx.QueryRow(createTaskQuery, list.Title, list.Content, articleID)
		if err := row.Scan(&articleWordID); err != nil {
			tx.Rollback()
			return 0, err
		}
	} else {
		query := fmt.Sprintf(`update %s set "content" = $1 where articles_id = %d`, articlesWordTable, articleID)
		_, err = r.db.Exec(query, list.Content)
	}

	return articleWordID, tx.Commit()
}

func (r *LibraryPostgres) GetWordArticle(articleID int) ([]dashboard.WordArticle, error) {
	var list []dashboard.WordArticle

	query := fmt.Sprintf("SELECT title, content FROM %s WHERE articles_id = $1", articlesWordTable)
	err := r.db.Select(&list, query, articleID)

	fmt.Println(err)

	return list, err
}
