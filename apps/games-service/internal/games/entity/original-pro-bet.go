package entity

import (
	uuid "github.com/satori/go.uuid"
)

type OrignalProBet struct {
	ID          string
	Name        string
	Title       string
	Model       string
	Category    string
	SubCategory string
	Provider    string
}

func NewOriginalProBet() *OrignalProBet {
	return &OrignalProBet{
		ID: uuid.NewV4().String(),
	}
}
