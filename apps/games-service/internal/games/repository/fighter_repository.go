package repository

import (
	"context"

	"github.com/iamrosada/probet_backend/internal/games/entity"
)

type FighterRepository interface {
	CreateFighter(ctx context.Context, fighter *entity.Fighter) error
	GetFighterByID(ctx context.Context, id string) (*entity.Fighter, error)
	UpdateFighter(ctx context.Context, fighter *entity.Fighter) error
	DeleteFighter(ctx context.Context, id string) error
	ListAllFighters(ctx context.Context) ([]*entity.Fighter, error)
}
