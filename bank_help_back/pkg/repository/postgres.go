package repository

import (
	"fmt"

	"github.com/jmoiron/sqlx"
)

const (
	usersTable        = "user"
	taskTable         = "task"
	testTable         = "tests"
	todoTable         = "todo"
	groupsTable       = "groups"
	conGroupsTable    = "con_group_user"
	testResultTable   = "tests_result"
	taskVariant       = "task_variants"
	sectionsTable     = "sections"
	articlesTable     = "articles"
	articlesWordTable = "articles_word"

	// todoItemsTable  = "todo_items"
	// listsItemsTable = "lists_items"

	// cardTable      = "card"
	// customerTable  = "customer"
	// workTable      = "work"
	// servicesTable  = "services"
	// materialsTable = "material"
	// categoryTable  = "category"
	// deliverTable   = "deliver"
)

type Config struct {
	Host     string
	Port     string
	Username string
	DBName   string
	Password string
	SSLMode  string
}

func NewPostgresDB(cfg Config) (*sqlx.DB, error) {
	db, err := sqlx.Open("postgres", fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=%s",
		cfg.Host, cfg.Port, cfg.Username, cfg.DBName, cfg.Password, cfg.SSLMode))
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}
