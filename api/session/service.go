package session

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/tiluk/pubg-heat-drop/models"
)

type Service struct {
	repository *Repository
}

func NewService(repository *Repository) *Service {
	return &Service{
		repository: repository,
	}
}

func (s *Service) CreateSession(ctx *fiber.Ctx) (*models.Session, error) {
	session := &models.Session{
		SessionID: uuid.NewString(),
		HasVoted:  false,
		Lobby:     "",
	}

	err := s.repository.CreateSession(ctx, session)
	if err != nil {
		return nil, err
	}

	return session, nil
}

func (s *Service) GetSession(ctx *fiber.Ctx, sessionID string) (*models.Session, error) {
	session, err := s.repository.GetSession(ctx, sessionID)
	if err != nil {
		return nil, err
	}

	return session, nil
}

func (s *Service) SetVoted(ctx *fiber.Ctx, sessionID string) error {
	err := s.repository.SetHasVoted(ctx, sessionID)
	if err != nil {
		return err
	}

	return nil
}
