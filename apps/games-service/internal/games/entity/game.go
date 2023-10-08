package entity

import (
	uuid "github.com/satori/go.uuid"
)

type Game struct {
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

func NewBattle() *Game {
	return &Game{
		ID: uuid.NewV4().String(),
	}
}
