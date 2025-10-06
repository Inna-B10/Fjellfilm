import { handleAddNewMovie, handleDeleteMovie, handleGetAllMovies, handleGetMovieByID, handleUpdateMovie } from '#controllers/movieController.js'
import { handleAddNewReview, handleDeleteReview, handleGetReviewsByMovieID } from '#controllers/reviewController.js'
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
