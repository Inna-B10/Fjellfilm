# 🎬 FjellFilm - Movie Review API

A simple RESTful API for managing movies and reviews, built with **Express.js** and **SQLite** (Better-SQLite3).  
The project supports basic CRUD operations for movies and nested CRUD for movie reviews.

<details>
<summary><h2 style="display:inline" >📦 Tech Stack</h2></summary>
<br />

| **Category** | **Tool**                         |
| ------------ | -------------------------------- |
| Runtime      | Node.js                          |
| Framework    | Express.js                       |
| Database     | SQLite (via Better-SQLite3)      |
| Environment  | dotenv                           |
| Middleware   | Helmet, CORS, Express Rate Limit |
| Dev Tool     | Nodemon                          |

<br />

- **Used packages:**

```js
npm install express
npm install nodemon -D
npm install nodemon -g
npm install cors
npm install dotenv
npm install better-sqlite3
npm install express-rate-limit
npm install helmet
```

</details>
<br />
<br />
<details>
<summary><h2 style="display:inline" >⚙️ Installation & Setup</h2></summary>
<br />

⚙️ Installation & Setup

```js
// Install dependencies
npm install

// Start the server
npm run dev
```

- **The server runs on:** `http://localhost:4200`
- **Database:** Each time the server starts, `database.js` checks if the tables exist.

  - If the tables were just created (i.e., the database is new), `seed.js` is automatically run to populate initial data.

</details>
<br />
<br />
<details>
<summary><h2 style="display:inline" >🧩 API Endpoints</h2></summary>

### 👉 [Api_collection_for_Postman](Api_collection_for_Postman.json)

### 🎥 Movies

| **Method** | **Endpoint**    | **Description**              |
| ---------- | --------------- | ---------------------------- |
| GET        | /api/movies     | Fetch all movies             |
| GET        | /api/movies/:id | Fetch a specific movie by ID |
| POST       | /api/movies     | Add a new movie              |
| PUT        | /api/movies/:id | Update an existing movie     |
| DELETE     | /api/movies/:id | Delete a movie by ID         |

#### **Examples**

- Create movie: **POST** `http://localhost:4200/api/movies`

```json
{
	"title": "No Mercy",
	"director": "Richard Pearce",
	"releaseYear": 1985,
	"genre": ["Drama", "Action"]
}
```

- Read all movies data: **GET** `http://localhost:4200/api/movies`
- Read single movie data: **GET** `http://localhost:4200/api/movies/6`

- Update movie: **PUT** `http://localhost:4200/api/movies/11`

```json
{
	"title": "No Mercy",
	"director": "Richard Pearce",
	"releaseYear": 1986,
	"genre": ["Drama", "Action", "Thriller"]
}
```

- Delete movie: **DELETE** `http://localhost:4200/api/movies/11`  
  ( including cascading deletion of reviews related to a movie )

<br/>

### 📝 Reviews

| Method | Endpoint                          | Description                          |
| ------ | --------------------------------- | ------------------------------------ |
| GET    | /api/movies/:id/reviews           | Get all reviews for a specific movie |
| POST   | /api/movies/:id/reviews           | Add a review for a specific movie    |
| DELETE | /api/movies/:id/reviews/:reviewId | Delete a review by ID                |

#### **Examples**

- Create review: **POST** `http://localhost:4200/api/movies/11/reviews`

```json
{
	"name": "Avata",
	"message": "Could not care any less about this movie if I tried. Horrible, boring, and a complete waste of time.",
	"rating": 2
}
```

```json
{
	"name": "John",
	"message": " I've seen worse, but this isn't a good movie. Basinger's hotness is the only highlight.",
	"rating": 3
}
```

- Read reviews: **GET** `http://localhost:4200/api/movies/11/reviews`

- Delete review: **DELETE** `DELETE http://localhost:4200/api/movies/11/reviews/25`

</details>
<br />
<br />
<details>
<summary><h2 style="display:inline" >🧠 Features</h2></summary>
<br />

- Full CRUD operations for movies and reviews
- Foreign key constraints with cascading delete
- For just created DB automatically seeding of initial data
- Input validation and error handling
- Rate limiting and security headers
- Config-based environment control (`NODE_ENV`, `.env`)

</details>
<br />

### 👩‍💻 Author

FjellFilm API – created for a course project.  
Clean code, pragmatic architecture, and a tiny sprinkle of Scandinavian drama.
