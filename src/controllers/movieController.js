import { addNewMovie, deleteMovie, getAllMovies, getMovieByID, updateMovie } from '#services/movieServices.js'
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
	// validation movieId
	if (isNaN(movieId)) {
		return res.status(400).json({ error: 'Invalid or missing movie ID' })
	}

	try {
		const data = getMovieByID(movieId)
		if (!data) {
			return res.status(404).json({ error: 'Movie not found!' })
		}
		res.json(data)
	} catch (err) {
		isDev && console.error('Database error: ', err.message)

		res.status(500).json({ error: `Failed to fetch movie with movie_id=${movieId}` })
	}
}

//* ------------------------------ Add New Movie ----------------------------- */
export const handleAddNewMovie = (req, res) => {
	try {
		let { title, director, releaseYear, genre } = req.body

		// -------- Validation --------
		if (!title || !director || !releaseYear || !genre) {
			return res.status(400).json({ error: 'All fields are required!' })
		}

		title = String(title).trim()
		if (title.length === 0) {
			return res.status(400).json({ error: 'Title cannot be empty' })
		}

		// Director: normalize to array
		if (!Array.isArray(director)) {
			director = [director]
		}
		director = director.map(d => String(d).trim()).filter(d => d.length > 0)
		if (director.length === 0) {
			return res.status(400).json({ error: 'At least one director is required' })
		}

		// Genre: normalize to array
		if (!Array.isArray(genre)) {
			genre = [genre]
		}
		genre = genre.map(g => String(g).trim()).filter(g => g.length > 0)
		if (genre.length === 0) {
			return res.status(400).json({ error: 'At least one genre is required' })
		}

		// Release year validation
		releaseYear = parseInt(releaseYear, 10)
		const currentYear = new Date().getFullYear()
		if (isNaN(releaseYear) || releaseYear < 1888 || releaseYear > currentYear) {
			return res.status(400).json({ error: 'Invalid release year' })
		}

		// -------- Save to DB --------
		const movie = {
			title,
			director: director.join(', '), // store as TEXT in DB
			releaseYear,
			genre: genre.join(', '), // store as TEXT in DB
		}

		const result = addNewMovie(movie)
		res.status(201).json({
			message: 'Movie added successfully',
			movie: {
				movie_id: result.lastInsertRowid,
				...movie,
				director,
				genre,
			},
		})
	} catch (err) {
		isDev && console.error('Database error: ', err.message)

		res.status(500).json({ error: 'Failed to add a new movie' })
	}
}

//* ------------------------------ Update Movie ------------------------------ */
export const handleUpdateMovie = (req, res) => {
	const movieId = parseInt(req.params.id, 10)

	if (isNaN(movieId)) {
		return res.status(400).json({ error: 'Invalid or missing movie ID' })
	}

	const movieData = getMovieByID(movieId)
	if (!movieData) return res.status(404).json({ error: 'Movie not found' })

	try {
		let { title, director, releaseYear, genre } = req.body

		// -------- Validation --------
		if (!title || !director || !releaseYear || !genre) {
			return res.status(400).json({ error: 'All fields are required!' })
		}

		title = String(title).trim()
		if (title.length === 0) {
			return res.status(400).json({ error: 'Title cannot be empty' })
		}

		// Director: normalize to array
		if (!Array.isArray(director)) {
			director = [director]
		}
		director = director.map(d => String(d).trim()).filter(d => d.length > 0)
		if (director.length === 0) {
			return res.status(400).json({ error: 'At least one director is required' })
		}

		// Genre: normalize to array
		if (!Array.isArray(genre)) {
			genre = [genre]
		}
		genre = genre.map(g => String(g).trim()).filter(g => g.length > 0)
		if (genre.length === 0) {
			return res.status(400).json({ error: 'At least one genre is required' })
		}

		// Release year validation
		releaseYear = parseInt(releaseYear, 10)
		const currentYear = new Date().getFullYear()
		if (isNaN(releaseYear) || releaseYear < 1888 || releaseYear > currentYear) {
			return res.status(400).json({ error: 'Invalid release year' })
		}

		// -------- Save to DB --------
		const updatedMovie = {
			title,
			director: director.join(', '),
			releaseYear,
			genre: genre.join(', '),
		}

		const result = updateMovie(movieId, updatedMovie)

		if (result.changes === 0) {
			return res.status(404).json({ error: 'Movie not found, update failed.' })
		}

		res.status(200).json({
			message: 'Movie updated successfully',
			movie: {
				movie_id: movieId,
				title,
				director,
				releaseYear,
				genre,
			},
		})
	} catch (err) {
		isDev && console.error('Database error: ', err.message)

		res.status(500).json({ error: `Failed to update movie with movie_id=${movieId}` })
	}
}

//* ------------------------------ Delete Movie ------------------------------ */
export const handleDeleteMovie = (req, res) => {
	const movieId = parseInt(req.params.id, 10)

	if (isNaN(movieId)) {
		return res.status(400).json({ error: 'Invalid or missing movie ID' })
	}

	try {
		const result = deleteMovie(movieId)
		if (result.changes === 0) {
			return res.status(404).json({ error: 'Movie not found' })
		}
		res.status(204).end()
	} catch (err) {
		isDev && console.error('Database error: ', err.message)

		res.status(500).json({ error: `Failed to delete movie with movie_id=${movieId}` })
	}
}
