package usecase

import (
	"github.com/iamrosada/probet_backend/internal/games/entity"
	"github.com/iamrosada/probet_backend/internal/games/repository"
)

type GameCreateUseCase struct {
	Repository repository.GameRepository
}

type CreateGameOutput struct {
	ID          string
	Name        string
	Title       string
	Model       string
	Category    string
	SubCategory string
	Provider    string
	Player1     string
	Player2     string
}

type CreateGameInput struct {
	Name        string
	Title       string
	Model       string
	Category    string
	SubCategory string
	Provider    string
	Player1     string
	Player2     string
}

func NewGameCreateUseCase(repo repository.GameRepository) *GameCreateUseCase {
	return &GameCreateUseCase{
		Repository: repo,
	}
}

func (uc *GameCreateUseCase) Execute(name string, title string, model string, category string, subCategory string, provider string, player1 string, player2 string) (*CreateGameOutput, error) {
	game := entity.NewGame(name, title, model, category, subCategory, provider, player1, player2)

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
