package main

import (
	"context"
	"dashboard"
	"dashboard/pkg/handler"
	"dashboard/pkg/repository"
	"dashboard/pkg/service"
	"os"
	"os/signal"
	"syscall"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

// type Todo struct {
// 	Title string
// 	Done  bool
// }

// type TodoPageData struct {
// 	PageTitle string
// 	Todos     []barbershop.Cards
// }

func main() {

	logrus.SetFormatter(new(logrus.JSONFormatter))
	if err := InitConfig(); err != nil {

		logrus.Fatalf("error initialisation configs: %s", err.Error())
	}

	if err := godotenv.Load(); err != nil {
		logrus.Fatalf("error loading env variables: %s", err.Error())
	}

	db, err := repository.NewPostgresDB(repository.Config{
		Host:     viper.GetString("db.host"),
		Port:     viper.GetString("db.port"),
		Username: viper.GetString("db.username"),
		DBName:   viper.GetString("db.dbname"),
		SSLMode:  viper.GetString("db.sslmode"),
		Password: os.Getenv("DB_PASSWORD"),
	})

	if err != nil {
		logrus.Fatalf("error initialisation db %s", err.Error())
	}

	repos := repository.NewRepository(db)
	services := service.NewService(repos)
	handlers := handler.NewHandler(services)
	//	//
	//tmpl := template.Must(template.ParseFiles("layout.html"))
	//http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	//	resp, _ := http.Get("localhost:8001/table/work")
	//	defer resp.Body.Close()
	//	body, _ := io.ReadAll(resp.Body)
	//	tmpl.Execute(w, body)
	//})
	//
	//
	////

	srv := new(dashboard.Server)
	go func() {
		if err := srv.Run(viper.GetString("port"), handlers.InitRoutes()); err != nil {
			logrus.Fatalf("error %s", err.Error())
		}
	}()

	logrus.Print("TodoApp Started")

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
	<-quit

	logrus.Print("TodoApp is Shutting Down")

	if err := srv.ShutDown(context.Background()); err != nil {
		logrus.Errorf("error occured on server shutting down: %s", err.Error())
	}

	if err := db.Close(); err != nil {
		logrus.Errorf("error occured on db connection close: %s", err.Error())
	}

	//data, err := http.Get("http://localhost:8001/table/work")
	//
	//tmpl := template.Must(template.ParseFiles("layout.html"))
	//http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	//	tmpl.Execute(w, data)
	//})
	//http.ListenAndServe(":8001", nil)
}

func InitConfig() error {
	viper.AddConfigPath("configs")
	viper.SetConfigName("config")
	return viper.ReadInConfig()
}
