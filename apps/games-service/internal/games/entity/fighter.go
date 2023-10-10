package entity

import "github.com/google/uuid"

type Fighter struct {
	ID             string `json:"id"`
	Name           string `json:"name"`
	Video          string `json:"video"`
	Image          string `json:"image"`
	TotalVictories int64  `json:"total_victories"`
	TotalLosses    int64  `json:"total_losses"`
	Description    string `json:"description"`
}

func NewFight(name, video, image, description string, totalVictories, totalLosses int64) *Fighter {
	return &Fighter{
		ID:             uuid.New().String(),
		Name:           name,
		Video:          video,
		Image:          image,
		TotalVictories: totalVictories,
		TotalLosses:    totalLosses,
		Description:    description,
	}
}
