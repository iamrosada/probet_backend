package entity

import "github.com/google/uuid"

type Fighter struct {
	ID          string `json:"id"`
	Player1     Player `json:"player1"`
	Player2     Player `json:"player2"`
	TotalBets   int64  `json:"total_bets"`
	Player1Bets int64  `json:"player1_bets"`
	Player2Bets int64  `json:"player2_bets"`
	Winner      string `json:"winner"`
	Description string `json:"description"`
	// Winner's name (Player1 or Player2)
}

// Player represents a player in a fight.
type Player struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Video       string `json:"video"`
	Image       string `json:"image"`
	Description string `json:"description"`
}

func NewFight(player1, player2 Player, description string) *Fighter {
	return &Fighter{
		ID:          uuid.New().String(),
		Player1:     player1,
		Player2:     player2,
		TotalBets:   0,
		Player1Bets: 0,
		Player2Bets: 0,
		Winner:      "loading",
		Description: description,

		// Winner is empty initially
	}
}

func NewPlayer(name, video, image, description string) *Player {
	return &Player{
		ID:          uuid.New().String(),
		Name:        name,
		Video:       video,
		Image:       image,
		Description: description,
	}
}
