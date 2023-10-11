package handler

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/iamrosada/probet_backend/internal/games/entity"
	usecase "github.com/iamrosada/probet_backend/internal/games/usecases"
)

type FighterHandler struct {
	FighterUseCase usecase.FighterUseCase
	PlayerUseCase  usecase.PlayerUseCase
	Db             *sql.DB
}

func NewFighterHandler(fighterUC usecase.FighterUseCase, playerUC usecase.PlayerUseCase, db *sql.DB) *FighterHandler {
	return &FighterHandler{
		FighterUseCase: fighterUC,
		PlayerUseCase:  playerUC,
		Db:             db,
	}
}

// para criar a luta deve se ter os dois jogadores
func (h *FighterHandler) CreateFighter(c *gin.Context) {
	var input struct {
		Player1ID   string `json:"player1_id"`
		Player2ID   string `json:"player2_id"`
		Description string `json:"description"`
	}
	var player1, player2 entity.Player

	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get the first player by ID
	// player2, err := h.PlayerUseCase.GetPlayerByID(c, input.Player1ID)
	// if err != nil {
	// 	c.JSON(http.StatusNotFound, gin.H{"error": "Player 1 not found"})
	// 	return
	// }

	// Define the SQL statement to select a player by ID
	sqlStmt := "SELECT id, name, video, image, description FROM players WHERE id = ?;"

	// Replace 'playerID' with the ID of the player you want to retrieve
	row := h.Db.QueryRow(sqlStmt, input.Player1ID)

	// Scan the result into the 'player' struct
	err := row.Scan(&player1.ID, &player1.Name, &player1.Video, &player1.Image, &player1.Description)
	if err != nil {
		c.JSON(http.StatusNotFound, "player1 not found")
		return
	}

	// c.JSON(http.StatusOK, player1)

	// Get the second player by ID
	sqlStmt2 := "SELECT id, name, video, image, description FROM players WHERE id = ?;"

	// Replace 'playerID' with the ID of the player you want to retrieve
	row2 := h.Db.QueryRow(sqlStmt2, input.Player2ID)

	// Scan the result into the 'player' struct
	err = row2.Scan(&player2.ID, &player2.Name, &player2.Video, &player2.Image, &player2.Description)
	if err != nil {
		c.JSON(http.StatusNotFound, "player2 not found")
		return
	}

	createTableSQL := `
    CREATE TABLE IF NOT EXISTS fighters (
        id           TEXT PRIMARY KEY,
        player1_id   TEXT,
        player2_id   TEXT,
        total_bets   BIGINT,
        player1_bets BIGINT,
        player2_bets BIGINT,
        winner       TEXT,
        description  TEXT
    );
`
	_, err = h.Db.Exec(createTableSQL)
	if err != nil {
		panic(err)
	}
	// Now that you have the player data, create the fighter
	// fighter, err := h.FighterUseCase.CreateFighter(context.TODO(), *player1, *player2)

	fighter := entity.NewFight(player1, player2, input.Description)
	_, err = h.Db.Exec("INSERT INTO fighters (id, player1_id, player2_id, total_bets, player1_bets, player2_bets, winner, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
		fighter.ID, fighter.Player1.ID, fighter.Player2.ID, fighter.TotalBets, fighter.Player1Bets, fighter.Player2Bets, fighter.Winner, fighter.Description)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create fighter"})
		return
	}

	c.JSON(http.StatusCreated, fighter)
}

func (h *FighterHandler) GetFighterByID(c *gin.Context) {
	fighterID := c.Param("id")

	fighter, err := h.FighterUseCase.GetFighterByID(c, fighterID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Fighter not found"})
		return
	}

	c.JSON(http.StatusOK, fighter)
}

// In FighterHandler
func (h *FighterHandler) UpdateFighter(c *gin.Context) {
	fighterID := c.Param("id")

	var input struct {
		Player1 entity.Player `json:"player1"`
		Player2 entity.Player `json:"player2"`
	}

	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fighter, err := h.FighterUseCase.GetFighterByID(c, fighterID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Fighter not found"})
		return
	}

	// Update the Player1 and Player2 fields, not Description
	fighter.Player1 = input.Player1
	fighter.Player2 = input.Player2

	if err := h.FighterUseCase.UpdateFighter(c, fighter); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update fighter"})
		return
	}

	c.JSON(http.StatusOK, fighter)
}

func (h *FighterHandler) DeleteFighter(c *gin.Context) {
	fighterID := c.Param("id")

	err := h.FighterUseCase.DeleteFighter(c, fighterID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete fighter"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Fighter deleted successfully"})
}

func (h *FighterHandler) ListAllFighters(c *gin.Context) {
	fighters, err := h.FighterUseCase.ListAllFighters(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch fighters"})
		return
	}

	c.JSON(http.StatusOK, fighters)
}
