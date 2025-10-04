import { handleGetAllMovies, handleGetMovieByID, handleGetReviewsByMovieID } from '#controllers/movieController.js'
import { Router } from 'express'

export const moviesRouter = Router()

moviesRouter.get('/', handleGetAllMovies)
moviesRouter.get('/:id', handleGetMovieByID)
moviesRouter.get('/:id/reviews', handleGetReviewsByMovieID)
