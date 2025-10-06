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

//* ------------------------------ Add New Movie ----------------------------- */
export function addNewMovie(movie) {
	const stmt = db.prepare(`
    INSERT INTO movies (title, director, releaseYear, genre)
    VALUES (?, ?, ?, ?)
    `)
	return stmt.run(movie.title, movie.director, movie.releaseYear, movie.genre)
}

//* ------------------------------ Update Movie ------------------------------ */
export function updateMovie(movieId, movie) {
	const stmt = db.prepare(`
    UPDATE movies SET title = ?, director = ?, releaseYear = ?, genre = ? WHERE movie_id = ?
    `)
	return stmt.run(movie.title, movie.director, movie.releaseYear, movie.genre, movieId)
}

//* --------------------------- Delete Movie By Id --------------------------- */
export function deleteMovie(movieId) {
	const stmt = db.prepare(`
		DELETE FROM movies WHERE movie_id = ?
		`)
	return stmt.run(movieId)
}
