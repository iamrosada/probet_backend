package handler

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/iamrosada/probet_backend/internal/games/entity"
	usecase "github.com/iamrosada/probet_backend/internal/games/usecases"
	"gorm.io/gorm"
)

var d *gorm.DB

type GameHandler struct {
	CreateUseCase usecase.GameCreateUseCase
	GetUseCase    usecase.GameGetUseCase
	Db            *sql.DB
}

func NewGameHandler(createUC usecase.GameCreateUseCase, getUC usecase.GameGetUseCase, db *sql.DB) *GameHandler {
	return &GameHandler{
		CreateUseCase: createUC,
		GetUseCase:    getUC,
		Db:            db,
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

	// Create a table if it doesn't exist.

	createTableSQL := `
    CREATE TABLE IF NOT EXISTS games (
        ID          INTEGER PRIMARY KEY AUTOINCREMENT,
        Name        TEXT,
        Title       TEXT,
        Model       TEXT,
        Category    TEXT,
        SubCategory TEXT,
        Provider    TEXT,
        Player1     TEXT,
        Player2     TEXT
    );
`
	_, err := h.Db.Exec(createTableSQL)
	if err != nil {
		panic(err)
	}

	// Insert data into the table.
	_, err = h.Db.Exec("INSERT INTO games (id, name, title, model, category, subCategory, provider, player1, player2) VALUES (?,?,?,?,?,?,?,?,?)",
		game.ID, game.Name, game.Title, game.Model, game.Category, game.SubCategory, game.Provider, game.Player1, game.Player2)

	if err != nil {
		return
	}

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
