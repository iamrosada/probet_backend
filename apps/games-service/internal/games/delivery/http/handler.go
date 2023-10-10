package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/iamrosada/probet_backend/internal/games/entity"
	usecase "github.com/iamrosada/probet_backend/internal/games/usecases"
	"gorm.io/gorm"
)

var t gorm.DB

type GameHandler struct {
	CreateUseCase usecase.GameCreateUseCase
	GetUseCase    usecase.GameGetUseCase
}

func NewGameHandler(createUC usecase.GameCreateUseCase, getUC usecase.GameGetUseCase) *GameHandler {
	return &GameHandler{
		CreateUseCase: createUC,
		GetUseCase:    getUC,
	}
}

func (h *GameHandler) CreateGame(c *gin.Context) {
	var input struct {
		Name        string `json:"name"`
		Title       string `json:"title"`
		Model       string `json:"model"`
		Category    string `json:"category"`
		SubCategory string `json:"subcategory"`
		Provider    string `json:"provider"`
		Player1     string `json:"player1"`
		Player2     string `json:"player2"`
	}

	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		// return
	}
	game := entity.NewGame(input.Name, input.Title, input.Model, input.Category, input.SubCategory, input.Provider, input.Player1, input.Player2)

	// game, err := h.CreateUseCase.CreateGame(input.Name, input.Title, input.Model, input.Category, input.SubCategory, input.Provider, input.Player1, input.Player2)
	// fmt.Println("Value returned!", game)
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	// 	return
	// }

	// if err := t.Create(&game).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, "the game not was created")
	// }
	c.JSON(http.StatusCreated, game)
}

func (h *GameHandler) GetGameByID(c *gin.Context) {
	id := c.Param("id")
	// Convert id to string and handle errors

	game, err := h.GetUseCase.GetGameByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, game)
}
