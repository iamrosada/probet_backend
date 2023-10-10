package repository

import (
	"github.com/iamrosada/probet_backend/internal/games/entity"
)

type GameRepository interface {
	Create(game *entity.Game) error
	GetByID(id string) (*entity.Game, error)
	Update(game *entity.Game) (*entity.Game, error)
	List() ([]*entity.Game, error)
	Delete(id string) error
	DeleteByCategory(category string) error
}
