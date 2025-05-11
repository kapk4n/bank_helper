package repository

import (
	"dashboard"
	"encoding/json"
	"fmt"

	"github.com/jmoiron/sqlx"
	"golang.org/x/exp/slices"
)

type RoomPostgres struct {
	db *sqlx.DB
}

func removeDuplicateInt(intSlice []int) []int {
	allKeys := make(map[int]bool)
	list := []int{}
	for _, item := range intSlice {
		if _, value := allKeys[item]; !value {
			allKeys[item] = true
			list = append(list, item)
		}
	}
	return list
}

func NewRoomPostgres(db *sqlx.DB) *RoomPostgres {
	return &RoomPostgres{db: db}
}

func (r *RoomPostgres) Create(list dashboard.RoomCreating, managerId int) (int, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	fmt.Print("from postgres:", list.Array, "      ")
	var arr []int
	_ = json.Unmarshal([]byte(list.Array), &arr)

	var roomId int
	query := fmt.Sprintf(`SELECT "room_id" FROM %s WHERE desk_id = $1`,
		deskTable)
	err = r.db.Get(&roomId, query, list.DeskId)

	fmt.Print("from postgres:", err, "      ")

	arr = removeDuplicateInt(arr)

	length := len(arr)

	var id int
	for i := 0; i < length; i++ {

		var userId []int
		query := fmt.Sprintf(`SELECT "user_id" FROM %s WHERE desk_id = $1`,
			roomTable)
		err = r.db.Select(&userId, query, list.DeskId)

		if !slices.Contains(userId, arr[i]) {
			createUsersRoomQuery := fmt.Sprintf(`INSERT INTO %s (user_id, manager_id, privacy, desk_id) VALUES ($1, $2, '1',$3) RETURNING room_id`, roomTable)
			row := tx.QueryRow(createUsersRoomQuery, arr[i], managerId, list.DeskId)
			if err := row.Scan(&id); err != nil {
				tx.Rollback()
				return 0, err
			}
		}
	}

	return id, tx.Commit()
}

func (r *RoomPostgres) GetAll(deskId int) ([]dashboard.RoomGetting, error) {
	var list []dashboard.RoomGetting
	query := fmt.Sprintf(`select room_id, r."user_id", manager_id, login
	from "%s" r 
	inner join "%s" u 
	on u."user_id" = r."user_id"
	where r."desk_id" = $1`,
		roomTable, usersTable)
	err := r.db.Select(&list, query, deskId)

	return list, err
}

func (r *RoomPostgres) GetLogins(deskId int) ([]dashboard.RoomGetting, error) {
	var list []dashboard.RoomGetting
	query := fmt.Sprintf(`select distinct login
	from "%s" r 
	inner join "%s" u 
	on u."user_id" = r."user_id"
	where r."desk_id" = $1`,
		roomTable, usersTable)
	err := r.db.Select(&list, query, deskId)

	return list, err
}

func (r *RoomPostgres) NewUser(list_Room dashboard.RoomGetting, deskId int) error {
	tx, err := r.db.Begin()
	if err != nil {
		return err
	}

	var list []int
	query := fmt.Sprintf(`select user_id
	from "%s" r 
	where r."desk_id" = $1`,
		roomTable)
	err = r.db.Select(&list, query, deskId)

	var manager_ids []int
	query = fmt.Sprintf(`select manager_id
	from "%s" r 
	where r."desk_id" = $1`,
		roomTable)
	err = r.db.Select(&manager_ids, query, deskId)

	var user_login = list_Room.UserLogin
	var user int
	query = fmt.Sprintf(`select user_id
	from "%s" r 
	where r."login" = $1`, usersTable)
	err = r.db.Get(&user, query, user_login)

	var id int
	if !slices.Contains(list, user) {
		createUsersRoomQuery := fmt.Sprintf(`INSERT INTO %s (user_id, manager_id, privacy, desk_id) VALUES ($1, $2, '1',$3) RETURNING room_id`, roomTable)
		row := tx.QueryRow(createUsersRoomQuery, user, manager_ids[0], deskId)
		if err := row.Scan(&id); err != nil {
			tx.Rollback()
			return err
		}
		return tx.Commit()
	}

	return err
}

func (r *RoomPostgres) GetAllUsers() ([]string, error) {
	var list []string
	query := fmt.Sprintf(`select login from "%s"`,
		usersTable)
	err := r.db.Select(&list, query)

	return list, err
}

func (r *RoomPostgres) Delete(desk_id int, user string, user_id int) error {

	var list dashboard.User
	query := fmt.Sprintf(`select user_id from "%s" where login = $1`,
		usersTable)
	err := r.db.Get(&list, query, user)

	var task []dashboard.Task
	query = fmt.Sprintf(`select * from "%s" where (employee_id = $1 or author_id = $1) and desk_id = $2`,
		taskTable)
	err = r.db.Select(&task, query, list.Id, desk_id)

	fmt.Println("fasmfla")
	if len(task) == 0 {
		query = fmt.Sprintf("DELETE FROM %s WHERE desk_id = $1 and user_id = $2 and manager_id = $3",
			roomTable)
		_, err = r.db.Exec(query, desk_id, list.Id, user_id)
		fmt.Println(desk_id, list.Id, user_id)
	}
	return err
}
