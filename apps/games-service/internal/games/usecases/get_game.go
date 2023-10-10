package usecase

import (
	"github.com/iamrosada/probet_backend/internal/games/entity"
	u "github.com/iamrosada/probet_backend/internal/games/repository"
)

type GameGetUseCase struct {
	Repository u.GameRepository
}

// Create implements repository.GameRepository.
func (*GameGetUseCase) Create(game *entity.Game) (*entity.Game, error) {
	panic("unimplemented")
}

// Delete implements repository.GameRepository.
func (*GameGetUseCase) Delete(id string) error {
	panic("unimplemented")
}

// DeleteByCategory implements repository.GameRepository.
func (*GameGetUseCase) DeleteByCategory(category string) error {
	panic("unimplemented")
}

// GetByID implements repository.GameRepository.
func (*GameGetUseCase) GetByID(id string) (*entity.Game, error) {
	panic("unimplemented")
}

// List implements repository.GameRepository.
func (*GameGetUseCase) List() ([]*entity.Game, error) {
	panic("unimplemented")
}

// Update implements repository.GameRepository.
func (*GameGetUseCase) Update(game *entity.Game) (*entity.Game, error) {
	panic("unimplemented")
}

func NewGameGetUseCase(repo u.GameRepository) *GameGetUseCase {
	return &GameGetUseCase{
		Repository: repo,
	}
}

func (uc *GameGetUseCase) GetGameByID(id string) (*entity.Game, error) {
	return uc.Repository.GetByID(id)
}
