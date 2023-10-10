package entity

import "github.com/google/uuid"

type Game struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Title       string `json:"title"`
	Model       string `json:"model"`
	Category    string `json:"category"`
	SubCategory string `json:"subcategory"`
	Provider    string `json:"provider"`
	Player1     string `json:"player1"`
	Player2     string `json:"player2"`
}

type NewGameDto struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Title       string `json:"title"`
	Model       string `json:"model"`
	Category    string `json:"category"`
	SubCategory string `json:"subcategory"`
	Provider    string `json:"provider"`
	Player1     string `json:"player1"`
	Player2     string `json:"player2"`
}

func NewGame(name string, title string, model string, category string, subcategory string, provider string, player1 string, player2 string) *Game {
	return &Game{
		ID:          uuid.New().String(),
		Name:        name,
		Title:       title,
		Model:       model,
		Category:    category,
		SubCategory: subcategory,
		Provider:    provider,
		Player1:     player1,
		Player2:     player2,
	}
}
