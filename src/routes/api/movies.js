import { handleAddNewMovie, handleAddNewReview, handleGetAllMovies, handleGetMovieByID, handleGetReviewsByMovieID } from '#controllers/movieController.js'
import { Router } from 'express'

export const moviesRouter = Router()

moviesRouter.get('/', handleGetAllMovies)
moviesRouter.get('/:id', handleGetMovieByID)
moviesRouter.get('/:id/reviews', handleGetReviewsByMovieID)
moviesRouter.post('/', handleAddNewMovie)
moviesRouter.post('/:id/reviews', handleAddNewReview)
