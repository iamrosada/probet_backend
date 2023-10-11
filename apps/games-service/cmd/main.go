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
	var playerRepo repository.PlayerRepository
	var fighterRepo usecase.FighterUseCase

	basePath := "/api/v1"

	createUC := usecase.NewGameCreateUseCase(v)
	getUC := usecase.NewGameGetUseCase(v)
	fighterUC := usecase.FighterUseCase(fighterRepo)
	playerUC := usecase.NewPlayerUseCase(playerRepo)
	// Create a handler instance
	gameHandler := http.NewGameHandler(*createUC, *getUC, db)
	fighterHandler := http.NewFighterHandler(fighterUC, *playerUC, db)

	playerHandler := http.NewPlayerHandler(*playerUC, db)
	//Creating  a groupe of routes
	router := gin.Default()

	v1 := router.Group(basePath)
	{
		v1.POST("/game", gameHandler.CreateGame)
		v1.GET("/game", gameHandler.GetGameByID)
		v1.DELETE("/games/delete", gameHandler.DeleteGameByID)
		v1.GET("/games/categories", gameHandler.GetGamesByCategory)
		v1.GET("/games", gameHandler.ListAllGames) // New endpoint to list all games

		// New endpoint to get games by category

		v1.POST("/game/fighter/", fighterHandler.CreateFighter)
		// v1.POST("/game/fighter/", plyerHandler.)
		v1.POST("/game/player/", playerHandler.CreatePlayer)
	}

	router.Run(":8080")
}
