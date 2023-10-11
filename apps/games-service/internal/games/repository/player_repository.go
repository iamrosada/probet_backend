package repository

import (
	"context"

	"github.com/iamrosada/probet_backend/internal/games/entity"
)

type PlayerRepository interface {
	CreatePlayer(ctx context.Context, player *entity.Player) error
	GetPlayerByID(ctx context.Context, id string) (*entity.Player, error)
	UpdatePlayer(ctx context.Context, player *entity.Player) error
	DeletePlayer(ctx context.Context, id string) error
	ListAllPlayers(ctx context.Context) ([]*entity.Player, error)
}
