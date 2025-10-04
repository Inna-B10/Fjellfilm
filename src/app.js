import { moviesRouter } from '#routes/api/movies.js'
import { rootRouter } from '#routes/root.js'
import { srcDir } from '#utils/path_resolver.js'
import express from 'express'
import path from 'path'
import { errorHandler } from './middleware/errorHandler.js'

export const app = express()

//* ------------------------------- Middlewares ------------------------------ */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(srcDir, '/public')))

//* --------------------------------- Routes --------------------------------- */
app.use('/', rootRouter)

// API router
app.use('/api/movies', moviesRouter)

//* ------------------------ 404 And ErrorHandler Middlewares ----------------------- */
// 404 API
app.use('/api/', (req, res) => {
	res.status(404).json({ error: 'API endpoint not found', path: req.originalUrl })
})

// 404 HTML
app.use((req, res) => {
	res.status(404).sendFile(path.join(srcDir, 'view', '404.html'))
})

app.use(errorHandler)
