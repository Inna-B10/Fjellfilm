import { isDev } from '#utils/isDev.js'
import { srcDir } from '#utils/path_resolver.js'
import Database from 'better-sqlite3'
import path from 'path'
import { seedDatabase } from './seed.js'

const dbPath = path.join(srcDir, 'database', 'fjellfilm.db')

export const db = new Database(dbPath, {
	// verbose: isDev ? console.log : undefined,
})

// enable foreign keys for THIS connection
db.pragma('foreign_keys = ON')

// if (isDev) {
// 	//check if foreign keys is ON
// 	const result = db.prepare(`PRAGMA foreign_keys;`).get()
// 	console.log('Foreign keys enabled?', result.foreign_keys === 1)
// }

//check if tables exist
const tables = db
	.prepare(
		`
  SELECT name FROM sqlite_master WHERE type='table' AND name IN ('movies', 'reviews')`
	)
	.all()

const tablesExist = tables.length > 0

//* --------------------------------- Tables --------------------------------- */
db.prepare(
	`
  CREATE TABLE IF NOT EXISTS movies
  (
  movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  director TEXT NOT NULL,
  releaseYear INTEGER NOT NULL,
  genre TEXT NOT NULL
  )
  `
).run()

db.prepare(
	`
  CREATE TABLE IF NOT EXISTS reviews
  (
  review_id INTEGER PRIMARY KEY AUTOINCREMENT,
  movie_id INTEGER NOT NULL,
  reviewAuthor TEXT NOT NULL,
  reviewText TEXT NOT NULL,
  rating INTEGER NOT NULL,
  FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE
  )
  `
).run()

//* --------------------------------- Indexes -------------------------------- */
db.prepare(
	`
CREATE INDEX IF NOT EXISTS idx_movies_title
ON movies (title)
`
).run()

db.prepare(
	`
  CREATE INDEX IF NOT EXISTS idx_reviews_movie_id
ON reviews (movie_id)`
).run()

db.prepare(
	`
  CREATE INDEX IF NOT EXISTS idx_movies_director
ON movies (director)`
).run()

db.prepare(
	`
  CREATE INDEX IF NOT EXISTS idx_movies_releaseYear
ON movies (releaseYear)`
).run()

db.prepare(
	`
  CREATE INDEX IF NOT EXISTS idx_movies_genre
ON movies (genre)`
).run()

isDev && console.log('The database and tables are ready for use.')

//seed data
if (!tablesExist) {
	isDev && console.log('The database was just created. Running seed.js')
	seedDatabase()
}
