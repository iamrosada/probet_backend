package entity

import (
	uuid "github.com/satori/go.uuid"
)

type Sport struct {
	ID          string
	Name        string
	Title       string
	Model       string
	Category    string
	SubCategory string
	Provider    string
}

func NewSport() *Sport {
	return &Sport{
		ID: uuid.NewV4().String(),
	}
}
