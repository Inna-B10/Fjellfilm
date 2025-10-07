import { isDev } from '#utils/isDev.js'
import { db } from './database.js'

export function seedDatabase() {
	// Movies
	db.prepare(
		`
  INSERT INTO movies (title, director, releaseYear, genre) VALUES
  ('Inception', 'Christopher Nolan', 2010, 'Sci-Fi, Thriller'),
  ('The Godfather', 'Francis Ford Coppola', 1972, 'Crime, Drama'),
  ('Pulp Fiction', 'Quentin Tarantino', 1994, 'Crime, Drama'),
  ('The Shawshank Redemption', 'Frank Darabont', 1994, 'Drama'),
  ('The Dark Knight', 'Christopher Nolan', 2008, 'Action, Crime'),
  ('Forrest Gump', 'Robert Zemeckis', 1994, 'Drama, Romance'),
  ('Parasite', 'Bong Joon-ho', 2019, 'Thriller, Drama'),
  ('Interstellar', 'Christopher Nolan', 2014, 'Sci-Fi, Adventure'),
  ('The Matrix', 'Lana Wachowski, Lilly Wachowski', 1999, 'Sci-Fi, Action'),
  ('Gladiator', 'Ridley Scott', 2000, 'Action, Drama');
`
	).run()

	// Reviews
	db.prepare(
		`
  INSERT INTO reviews (movie_id, reviewAuthor, reviewText, rating) VALUES
  (1, 'Anna', 'Visually impressive but a bit confusing.', 4),
  (1, 'Lars', 'Too complex for my taste.', 3),
  (1, 'Sofia', 'Loved the dream layers and visuals!', 5),

  (2, 'Knut', 'A masterpiece, absolutely loved it.', 5),
  (2, 'Sofie', 'Great storytelling, but slow in parts.', 4),
  (2, 'Erik', 'Overrated in my opinion.', 3),

  (3, 'Erik', 'Entertaining, but violence was excessive.', 3),
  (3, 'Mia', 'Quirky and brilliant dialogues.', 5),
  (3, 'Jonas', 'Some parts felt too random.', 3),

  (4, 'Mia', 'Truly touching and memorable.', 5),
  (4, 'Ida', 'A slow start but worth it.', 4),

  (5, 'Jonas', 'Heath Ledger was amazing, movie a bit dark for me.', 4),
  (5, 'Emma', 'Good action scenes but predictable plot.', 3),
  (5, 'Nils', 'Best superhero movie ever!', 5),

  (6, 'Ida', 'Heartwarming but dragged in some parts.', 4),
  (6, 'Ola', 'Tom Hanks shines as usual.', 5),

  (7, 'Nils', 'Suspenseful and well-directed, a bit confusing at times.', 4),
  (7, 'Hanne', 'Social commentary is brilliant.', 5),

  (8, 'Ola', 'Epic story, but a bit long.', 4),
  (8, 'Fredrik', 'Science-heavy but amazing visuals.', 5),

  (9, 'Hanne', 'Innovative but dated effects.', 3),
  (9, 'Anna', 'A game-changer for sci-fi movies.', 5),

  (10, 'Fredrik', 'Exciting but not my favorite.', 3),
  (10, 'Lars', 'Epic battles and story.', 4);
`
	).run()

	isDev && console.log('Seeding completed.')
}
