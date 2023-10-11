package handler

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/iamrosada/probet_backend/internal/games/entity"
	usecase "github.com/iamrosada/probet_backend/internal/games/usecases"
)

type PlayerHandler struct {
	PlayerUseCase usecase.PlayerUseCase
	Db            *sql.DB
}

func NewPlayerHandler(playerUC usecase.PlayerUseCase, db *sql.DB) *PlayerHandler {
	return &PlayerHandler{
		PlayerUseCase: playerUC,
		Db:            db,
	}
}

func (h *PlayerHandler) CreatePlayer(c *gin.Context) {
	// var input entity.Player
	var input struct {
		ID          string `json:"id"`
		Name        string `json:"name"`
		Video       string `json:"video"`
		Image       string `json:"image"`
		Description string `json:"description"`
	}

	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	player := entity.NewPlayer(input.Name, input.Video, input.Image, input.Description)

	createPlayersTableSQL := `
	CREATE TABLE IF NOT EXISTS players (
			id          TEXT PRIMARY KEY,
			name        TEXT,
			video       TEXT,
			image       TEXT,
			description TEXT
	);
`

	_, err := h.Db.Exec(createPlayersTableSQL)
	if err != nil {
		panic(err)
	}
	playerID := uuid.New().String()

	// player, err := h.PlayerUseCase.CreatePlayer(c, input)
	//devo reparar esse erro do usecase, nao esta funcionando com essa camada
	_, err = h.Db.Exec("INSERT INTO players (id, name, video, image, description) VALUES (?, ?, ?, ?, ?);",
		playerID, player.Name, player.Video, player.Image, player.Description)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create player"})
		return
	}

	c.JSON(http.StatusCreated, player)
}
