package router

// import (
// 	"github.com/gin-gonic/gin"
// 	http "github.com/iamrosada/probet_backend/internal/games/delivery/http"
// 	repository "github.com/iamrosada/probet_backend/internal/games/repository"
// 	usecase "github.com/iamrosada/probet_backend/internal/games/usecases"
// )

// func initializeRoutes(router *gin.Engine) {
// 	var v repository.GameRepository

// 	basePath := "/api/v1"

// 	createUC := usecase.NewGameCreateUseCase(v)
// 	getUC := usecase.NewGameGetUseCase(v)

// 	// Create a handler instance
// 	gameHandler := http.NewGameHandler(*createUC, *getUC)
// 	//Creating  a groupe of routes
// 	v1 := router.Group(basePath)
// 	{
// 		v1.POST("/game", gameHandler.CreateGame)

// 	}
// }
