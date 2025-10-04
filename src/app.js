import { moviesRouter } from '#routes/api/movies.js'
import { rootRouter } from '#routes/root.js'
import { projectRoot } from '#utils/path_resolver.js'
import express from 'express'
import path from 'path'

export const app = express()

//* ------------------------------- Middlewares ------------------------------ */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(projectRoot, '/public')))

//* --------------------------------- Routes --------------------------------- */
app.use('/', rootRouter)

// API router
app.use('/api/movies', moviesRouter)

//* ----------------------------------- 404 ---------------------------------- */
// 404 API
app.use('/api/', (req, res) => {
	res.status(404).json({ error: 'API endpoint not found', path: req.originalUrl })
})

// 404 HTML
app.use((req, res) => {
	res.status(404).sendFile(path.join(projectRoot, 'view', '404.html'))
})
