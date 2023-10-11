package handler

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/iamrosada/probet_backend/internal/games/entity"
	usecase "github.com/iamrosada/probet_backend/internal/games/usecases"
)

type FighterHandler struct {
	FighterUseCase usecase.FighterUseCase
	PlayerUseCase  usecase.PlayerUseCase
}

func NewFighterHandler(fighterUC usecase.FighterUseCase, playerUC usecase.PlayerUseCase) *FighterHandler {
	return &FighterHandler{
		FighterUseCase: fighterUC,
		PlayerUseCase:  playerUC,
	}
}

// para criar a luta deve se ter os dois jogadores
func (h *FighterHandler) CreateFighter(c *gin.Context) {
	var input struct {
		Player1ID   string `json:"player1_id"`
		Player2ID   string `json:"player2_id"`
		Description string `json:"description"`
	}

	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get the first player by ID
	player1, err := h.PlayerUseCase.GetPlayerByID(c, input.Player1ID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Player 1 not found"})
		return
	}

	// Get the second player by ID
	player2, err := h.PlayerUseCase.GetPlayerByID(c, input.Player2ID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Player 2 not found"})
		return
	}

	// Now that you have the player data, create the fighter
	fighter, err := h.FighterUseCase.CreateFighter(context.TODO(), *player1, *player2)
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
