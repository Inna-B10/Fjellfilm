import { getMovieByID } from '#services/movieServices.js'
import { addNewReview, deleteReview, getReviewsByMovieID } from '#services/reviewServices.js'
import { isDev } from '#utils/isDev.js'

//* ----------------------------- Add New Review ----------------------------- */
export const handleAddNewReview = (req, res) => {
	const movieId = parseInt(req.params.id, 10)
	// validation movieId
	if (isNaN(movieId)) {
		return res.status(400).json({ error: 'Invalid or missing movie ID' })
	}

	try {
		// first check if movie exists
		const movie = getMovieByID(movieId)
		if (!movie) return res.status(404).json({ error: 'Movie not found' })

		let { name, message, rating } = req.body

		// -------- Validation --------
		if (!name || !message || rating == null) {
			return res.status(400).json({ error: 'All fields are required!' })
		}

		name = String(name).trim()
		if (name.length === 0) {
			return res.status(400).json({ error: 'Name cannot be empty' })
		}

		message = String(message).trim()
		if (message.length === 0) {
			return res.status(400).json({ error: 'Review cannot be empty' })
		}

		rating = Number(rating)
		if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
			return res.status(400).json({ error: 'Invalid rating value' })
		}

		// -------- Save to DB --------
		const result = addNewReview(movieId, name, message, rating)
		res
			.status(201)
			.location(`/api/movies/${movieId}/reviews/${result.lastInsertRowid}`)
			.json({
				message: 'Review added successfully',
				review: {
					review_id: result.lastInsertRowid,
					movie_id: movieId,
					reviewAuthor: name,
					reviewText: message,
					rating: rating,
				},
			})
	} catch (err) {
		isDev() && console.error('Database error: ', err.message)

		res.status(500).json({ error: 'Failed to add a new review' })
	}
}

//* ------------------------- Get Reviews By Movie ID ------------------------ */
export const handleGetReviewsByMovieID = (req, res) => {
	const movieId = parseInt(req.params.id, 10)

	// validation movieId
	if (isNaN(movieId)) return res.status(400).json({ error: 'Invalid or missing movie ID' })

	try {
		// first check if movie exists
		const movie = getMovieByID(movieId)
		if (!movie) return res.status(404).json({ error: 'Movie not found' })

		// get reviews
		const reviews = getReviewsByMovieID(movieId)

		if (!reviews.length) return res.status(404).json({ error: 'Reviews not found' })

		res.json({ movieTitle: movie.title, reviews })
	} catch (err) {
		isDev() && console.error('Database error: ', err.message)
		res.status(500).json({ error: `Failed to fetch reviews for movie with movie_id=${movieId}` })
	}
}

//* ------------------------------ Delete Review ----------------------------- */
export const handleDeleteReview = (req, res) => {
	const reviewId = parseInt(req.params.reviewId, 10)
	const movieId = parseInt(req.params.id, 10)

	if (isNaN(reviewId) || isNaN(movieId)) {
		return res.status(400).json({ error: 'Invalid or missing movie or review ID' })
	}

	try {
		const result = deleteReview(reviewId, movieId)
		if (result.changes === 0) {
			return res.status(404).json({ error: 'Review not found' })
		}
		res.status(204).end()
	} catch (err) {
		isDev() && console.error('Database error: ', err.message)

		res.status(500).json({ error: `Failed to delete review with review_id=${reviewId}` })
	}
}
