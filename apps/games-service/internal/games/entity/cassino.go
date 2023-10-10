package entity

import (
	uuid "github.com/satori/go.uuid"
)

type Cassino struct {
	ID          string
	Name        string
	Title       string
	Model       string
	Category    string
	SubCategory string
	Provider    string
}

func NewCassino() *Cassino {
	return &Cassino{
		ID: uuid.NewV4().String(),
	}
}
