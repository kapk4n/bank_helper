package repository

import (
	"fmt"

	"github.com/jmoiron/sqlx"
)

const (
	usersTable    = "user"
	deskTable     = "desk"
	roomTable     = "room"
	taskRoomTable = "task_room"
	taskTable     = "task_dash"
	commentTable  = "comment"

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
