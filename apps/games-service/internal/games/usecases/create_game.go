package usecase

import (
	"fmt"

	"github.com/iamrosada/probet_backend/internal/games/entity"
	"github.com/iamrosada/probet_backend/internal/games/repository"
)

type GameCreateUseCase struct {
	Repository repository.GameRepository
}

type CreateGameOutput struct {
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

type CreateGameInput struct {
	Name        string `json:"name"`
	Title       string `json:"title"`
	Model       string `json:"model"`
	Category    string `json:"category"`
	SubCategory string `json:"subcategory"`
	Provider    string `json:"provider"`
	Player1     string `json:"player1"`
	Player2     string `json:"player2"`
}

func NewGameCreateUseCase(repo repository.GameRepository) *GameCreateUseCase {
	return &GameCreateUseCase{
		Repository: repo,
	}
}

func (uc *GameCreateUseCase) Execute(name string, title string, model string, category string, subCategory string, provider string, player1 string, player2 string) (*CreateGameOutput, error) {
	game := entity.NewGame(name, title, model, category, subCategory, provider, player1, player2)

	fmt.Println(game, "inside usecase")
	err := uc.Repository.Create(game)
	if err != nil {
		return nil, err
	}
	return &CreateGameOutput{
		ID:          game.ID,
		Name:        game.Name,
		Title:       game.Title,
		Model:       game.Model,
		Category:    game.Category,
		SubCategory: game.SubCategory,
		Provider:    game.Provider,
		Player1:     game.Player1,
		Player2:     game.Player2,
	}, nil
}
