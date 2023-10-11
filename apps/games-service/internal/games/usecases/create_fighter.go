package usecase

import (
	"context"

	"github.com/google/uuid"
	"github.com/iamrosada/probet_backend/internal/games/entity"
	"github.com/iamrosada/probet_backend/internal/games/repository"
)

type FighterUseCase struct {
	fighterRepo repository.FighterRepository
}

func NewFighterUseCase(repo repository.FighterRepository) *FighterUseCase {
	return &FighterUseCase{
		fighterRepo: repo,
	}
}

func (uc *FighterUseCase) CreateFighter(ctx context.Context, player1, player2 entity.Player) (*entity.Fighter, error) {
	// Generate a new ID for the fighter.
	fighterID := uuid.New().String()

	// Create a new Fighter entity.
	fighter := entity.Fighter{
		ID:          fighterID,
		Player1:     player1,
		Player2:     player2,
		TotalBets:   0,
		Player1Bets: 0,
		Player2Bets: 0,
		Winner:      "loading",
	}

	// Call the repository to create the fighter.
	if err := uc.fighterRepo.CreateFighter(ctx, &fighter); err != nil {
		return nil, err
	}

	return &fighter, nil
}

func (uc *FighterUseCase) GetFighterByID(ctx context.Context, id string) (*entity.Fighter, error) {
	// Call the repository to get the fighter by ID.
	fighter, err := uc.fighterRepo.GetFighterByID(ctx, id)
	if err != nil {
		return nil, err
	}

	return fighter, nil
}

func (uc *FighterUseCase) UpdateFighter(ctx context.Context, fighter *entity.Fighter) error {
	// Call the repository to update the fighter.
	return uc.fighterRepo.UpdateFighter(ctx, fighter)
}

func (uc *FighterUseCase) DeleteFighter(ctx context.Context, id string) error {
	// Call the repository to delete the fighter by ID.
	return uc.fighterRepo.DeleteFighter(ctx, id)
}

func (uc *FighterUseCase) ListAllFighters(ctx context.Context) ([]*entity.Fighter, error) {
	// Call the repository to list all fighters.
	fighters, err := uc.fighterRepo.ListAllFighters(ctx)
	if err != nil {
		return nil, err
	}

	return fighters, nil
}
