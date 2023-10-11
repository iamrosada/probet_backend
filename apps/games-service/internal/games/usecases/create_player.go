package usecase

import (
	"context"

	"github.com/google/uuid"
	"github.com/iamrosada/probet_backend/internal/games/entity"
	"github.com/iamrosada/probet_backend/internal/games/repository"
)

type PlayerUseCase struct {
	playerRepo repository.PlayerRepository
}

func NewPlayerUseCase(repo repository.PlayerRepository) *PlayerUseCase {
	return &PlayerUseCase{
		playerRepo: repo,
	}
}

func (uc *PlayerUseCase) CreatePlayer(ctx context.Context, player entity.Player) (*entity.Player, error) {
	// Generate a new ID for the player.
	playerID := uuid.New().String()

	// Set the generated ID for the player.
	player.ID = playerID

	// Call the repository to create the player.
	if err := uc.playerRepo.CreatePlayer(ctx, &player); err != nil {
		return nil, err
	}

	return &player, nil
}

func (uc *PlayerUseCase) GetPlayerByID(ctx context.Context, id string) (*entity.Player, error) {
	// Call the repository to get the player by ID.
	player, err := uc.playerRepo.GetPlayerByID(ctx, id)
	if err != nil {
		return nil, err
	}

	return player, nil
}

func (uc *PlayerUseCase) UpdatePlayer(ctx context.Context, player *entity.Player) error {
	// Call the repository to update the player.
	return uc.playerRepo.UpdatePlayer(ctx, player)
}

func (uc *PlayerUseCase) DeletePlayer(ctx context.Context, id string) error {
	// Call the repository to delete the player by ID.
	return uc.playerRepo.DeletePlayer(ctx, id)
}

func (uc *PlayerUseCase) ListAllPlayers(ctx context.Context) ([]*entity.Player, error) {
	// Call the repository to list all players.
	players, err := uc.playerRepo.ListAllPlayers(ctx)
	if err != nil {
		return nil, err
	}

	return players, nil
}
