import { db } from '#database/database.js'

//* ------------------------------- Add Review ------------------------------- */
export function addNewReview(movieId, name, message, rating) {
	const stmt = db.prepare(`
    INSERT INTO reviews (movie_id, reviewAuthor, reviewText, rating)
    VALUES (?, ?, ?, ?)
    `)
	return stmt.run(movieId, name, message, rating)
}

//* ------------------------- Get Reviews By Movie ID ------------------------ */
export function getReviewsByMovieID(id) {
	const stmt = db.prepare('SELECT reviewAuthor, reviewText FROM reviews WHERE movie_id = ?')
	return stmt.all(id)
}

//* --------------------------- Delete Review By Id -------------------------- */
export function deleteReview(reviewId, movieId) {
	const stmt = db.prepare(`
		DELETE FROM reviews WHERE review_id = ? AND movie_id = ?
		`)
	return stmt.run(reviewId, movieId)
}
