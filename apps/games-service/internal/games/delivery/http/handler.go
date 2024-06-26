package handler

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/iamrosada/probet_backend/internal/games/entity"
	usecase "github.com/iamrosada/probet_backend/internal/games/usecases"
)

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
		return
	}

	game := entity.NewGame(input.Name, input.Title, input.Model, input.Category, input.SubCategory, input.Provider, input.Player1, input.Player2)

	createTableSQL := `
			CREATE TABLE IF NOT EXISTS games (
				  id          TEXT PRIMARY KEY,
					name        TEXT,
					title       TEXT,
					model       TEXT,
					category    TEXT,
					subcategory TEXT,
					provider    TEXT,
					player1     TEXT,
					player2     TEXT
			);
	`
	_, err := h.Db.Exec(createTableSQL)
	if err != nil {
		panic(err)
	}

	gameID := uuid.New().String()

	// // Insert data into the table using a prepared statement.
	_, err = h.Db.Exec("INSERT INTO games (id, name, title, model, category, subcategory, provider, player1, player2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
		gameID, game.Name, game.Title, game.Model, game.Category, game.SubCategory, game.Provider, input.Player1, input.Player2)

	if err != nil {
		c.JSON(http.StatusConflict, "Data not inserted into the table")
		return
	}

	c.JSON(http.StatusCreated, game)
}

func (h *GameHandler) GetGameByID(c *gin.Context) {
	gameID := c.Query("id")
	fmt.Println(gameID)

	// Execute an SQL query to fetch the game with the specified ID.
	sqlStmt := "SELECT id, name, title, model, category, subcategory, provider, player1, player2 FROM games WHERE id = ?;"
	row := h.Db.QueryRow(sqlStmt, gameID)

	var game entity.Game

	err := row.Scan(&game.ID, &game.Name, &game.Title, &game.Model, &game.Category, &game.SubCategory, &game.Provider, &game.Player1, &game.Player2)
	if err != nil {
		c.JSON(http.StatusNotFound, "Game not found")
		return
	}

	c.JSON(http.StatusOK, game)
}

func (h *GameHandler) DeleteGameByID(c *gin.Context) {
	// Parse the game ID from the URL parameters.
	gameID := c.Query("id")

	// Execute an SQL query to delete the game with the specified ID.
	_, err := h.Db.Exec("DELETE FROM games WHERE id = ?;", gameID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Error deleting the game from the database")
		return
	}

	c.JSON(http.StatusOK, "Game deleted successfully")
}

func (h *GameHandler) GetGamesByCategory(c *gin.Context) {
	// Parse the category from the URL parameters.
	category := c.Query("category")

	rows, err := h.Db.Query("SELECT id, name, title, model, category, subcategory, provider, player1, player2 FROM games WHERE category = ?;", category)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Error querying the database")
		return
	}
	defer rows.Close()

	var games []entity.Game
	for rows.Next() {
		var game entity.Game
		err := rows.Scan(&game.ID, &game.Name, &game.Title, &game.Model, &game.Category, &game.SubCategory, &game.Provider, &game.Player1, &game.Player2)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Error scanning rows from the database")
			return
		}
		games = append(games, game)
	}

	c.JSON(http.StatusOK, games)
}

func (h *GameHandler) ListAllGames(c *gin.Context) {
	// Execute an SQL query to fetch all games from the database.
	rows, err := h.Db.Query("SELECT id, name, title, model, category, subcategory, provider, player1, player2 FROM games;")
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Error querying the database")
		return
	}
	defer rows.Close()

	var games []entity.Game
	for rows.Next() {
		var game entity.Game
		err := rows.Scan(&game.ID, &game.Name, &game.Title, &game.Model, &game.Category, &game.SubCategory, &game.Provider, &game.Player1, &game.Player2)
		if err != nil {
			c.JSON(http.StatusInternalServerError, "Error scanning rows from the database")
			return
		}
		games = append(games, game)
	}

	c.JSON(http.StatusOK, games)
}
