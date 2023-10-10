package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"

	http "github.com/iamrosada/probet_backend/internal/games/delivery/http"

	"github.com/gin-gonic/gin"
	"github.com/iamrosada/probet_backend/internal/games/repository"
	usecase "github.com/iamrosada/probet_backend/internal/games/usecases"
)

var (
	router *gin.Engine
)

func main() {
	dbPath := "./db/main.db"
	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		panic(err)
	}
	defer db.Close() // espera tudo rodar e depois executa o close
	var v repository.GameRepository

	basePath := "/api/v1"

	createUC := usecase.NewGameCreateUseCase(v)
	getUC := usecase.NewGameGetUseCase(v)

	// Create a handler instance
	gameHandler := http.NewGameHandler(*createUC, *getUC, db)
	//Creating  a groupe of routes
	router := gin.Default()

	v1 := router.Group(basePath)
	{
		v1.POST("/game", gameHandler.CreateGame)

	}
	// createUC := usecase.NewGameCreateUseCase(v)
	// getUC := usecase.NewGameGetUseCase(v)

	// Create a handler instance
	// gameHandler := http.NewGameHandler(*createUC, *getUC)

	// dbPath := "./db/main.db"
	// db, err := gorm.Open(sqlite.Open(dbPath), &gorm.Config{})

	// if err != nil {
	// 	panic("failed to connect database")

	// }

	// //Migrate the schemas
	// err = db.AutoMigrate(&entity.Game{})

	// if err != nil {
	// 	//panic(err)
	// 	fmt.Println(err)
	// 	// logger.Errorf("Config Initialization error: %v", err)
	// 	return
	// }
	// //Initialize Route
	// router.Initialize()

	// initializeRoutes(router)

	// //Start running the API
	router.Run(":8080")
}
