package battlegame

import (
	"github.com/iamrosada/probet_backend/internal/games/entity"
	dtos "github.com/iamrosada/probet_backend/internal/games/usecases"
)

type CreateBattleGameUseCase struct {
	Repository entity.GameRepository
}

func (c *CreateBattleGameUseCase) Create(input dtos.CreateGameInputDto) (dtos.CreateGameOutputDto, error) {
	// Your code to create and persist the game

	game := entity.NewBattle(input)

	game := entity.Game{}
	game.ID = entity.NewBattle().ID
	game.Name = input.Name
	game.Category = input.Category
	game.Model = input.Model
	game.Provider = input.Provider
	game.SubCategory = input.SubCategory

	result, err := c.Repository.Create(&game)
	if err != nil {
		return dtos.CreateGameOutputDto{}, err
	}
	output := dtos.CreateGameOutputDto{}
	output.ID = result.ID
	output.Name = result.Name
	output.Category = result.Category
	output.SubCategory = result.Title
	output.Model = result.Model
	output.Provider = result.Provider

	return output, nil
}
