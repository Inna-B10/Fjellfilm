import { moviesRouter } from '#routes/api/movies.js'
import { rootRouter } from '#routes/root.js'
import { isDev } from '#utils/isDev.js'
import { srcDir } from '#utils/path_resolver.js'
import express from 'express'
import helmet from 'helmet'
import path from 'path'
import { errorHandler } from './middleware/errorHandler.js'
import { apiLimiter } from './middleware/rateLimiter.js'

export const app = express()
// const isDev = await import('#utils/isDev.js')

//* ------------------------------- Middlewares ------------------------------ */
//rate limiting
if (!isDev) {
	app.use('/api/', apiLimiter)
}
app.use(helmet())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// if SyntaxError in JSON format
app.use((err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		return res.status(400).json({ error: 'Invalid JSON format' })
	}
	next()
})
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
