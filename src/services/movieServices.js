import { db } from '#database/database.js'

//* ----------------------------- Get All Movies ----------------------------- */
export function getAllMovies() {
	const rows = db.prepare('SELECT * FROM movies').all()

	if (!rows) return null

	return rows.map(row => ({
		...row,
		director: row.director ? row.director.split(',').map(d => d.trim()) : [],
		genre: row.genre ? row.genre.split(',').map(g => g.trim()) : [],
	}))
}

//* ----------------------------- Get Movie By ID ---------------------------- */
export function getMovieByID(id) {
	const row = db.prepare('SELECT * FROM movies WHERE movie_id = ?').get(id)

	if (!row) return null

	return {
		...row,
		director: row.director ? row.director.split(',').map(d => d.trim()) : [],
		genre: row.genre ? row.genre.split(',').map(g => g.trim()) : [],
	}
}

//* ------------------------- Get Review By Movie ID ------------------------- */
export function getReviewsByMovieID(id) {
	const stmt = db.prepare('SELECT reviewAuthor, reviewText FROM reviews WHERE movie_id = ?')
	return stmt.all(id)
}
