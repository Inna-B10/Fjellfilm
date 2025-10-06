import {
	handleAddNewMovie,
	handleAddNewReview,
	handleDeleteMovie,
	handleDeleteReview,
	handleGetAllMovies,
	handleGetMovieByID,
	handleGetReviewsByMovieID,
	handleUpdateMovie,
} from '#controllers/movieController.js'
import { Router } from 'express'

export const moviesRouter = Router()

moviesRouter.get('/', handleGetAllMovies)
moviesRouter.get('/:id', handleGetMovieByID)
moviesRouter.get('/:id/reviews', handleGetReviewsByMovieID)
moviesRouter.post('/', handleAddNewMovie)
moviesRouter.post('/:id/reviews', handleAddNewReview)
moviesRouter.put('/:id', handleUpdateMovie)
moviesRouter.delete('/:id/reviews/:reviewId', handleDeleteReview)
moviesRouter.delete('/:id', handleDeleteMovie)
