import { db } from '#database/database.js'

//* ----------------------------- Get All Movies ----------------------------- */
export function getAllMovies() {
	const stmt = db.prepare('SELECT * FROM movies')
	return stmt.all()
}

//* ----------------------------- Get Movie By ID ---------------------------- */
export function getMovieByID(id) {
	const stmt = db.prepare('SELECT * FROM movies WHERE movie_id = ?')
	return stmt.get(id)
}

//* ------------------------- Get Review By Movie ID ------------------------- */
export function getReviewsByMovieID(id) {
	const stmt = db.prepare('SELECT reviewAuthor, reviewText FROM reviews WHERE movie_id = ?')
	return stmt.all(id)
}
