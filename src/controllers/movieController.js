import { getAllMovies, getMovieByID, getReviewsByMovieID } from '#services/movieServices.js'
import { isDev } from '#utils/isDev.js'

//* ----------------------------- Get All Movies ----------------------------- */
export const handleGetAllMovies = (req, res) => {
	try {
		const data = getAllMovies()
		res.json(data)
	} catch (err) {
		isDev && console.error('Database error: ', err.message)
		res.status(500).json({ error: 'Failed to fetch movies' })
	}
}

//* ----------------------------- Get Movie By ID ---------------------------- */
export const handleGetMovieByID = (req, res) => {
	const movieId = parseInt(req.params.id, 10)
	// validation
	if (isNaN(movieId)) {
		return res.status(400).json({ error: 'Invalid or missing movie ID' })
	}

	try {
		const data = getMovieByID(movieId)
		if (!data) {
			return res.status(404).json({ error: `Movie not found!` })
		}
		res.json(data)
	} catch (err) {
		isDev && console.error('Database error: ', err.message)

		res.status(500).json({ error: `Failed to fetch movie with id=${movieId}` })
	}
}

//* ------------------------- Get Review By Movie ID ------------------------- */
export const handleGetReviewsByMovieID = (req, res) => {
	const movieId = parseInt(req.params.id, 10)
	// validation
	if (isNaN(movieId)) {
		return res.status(400).json({ error: 'Invalid or missing movie ID' })
	}

	try {
		const data = getReviewsByMovieID(movieId)
		if (!data) {
			return res.status(404).json({ error: 'Reviews not found' })
		}
		res.json(data)
	} catch (err) {
		isDev && console.error('Database error: ', err.message)

		res.status(500).json({ error: `Failed to fetch reviews for movie with id=${movieId}` })
	}
}
