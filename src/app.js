import { projectRoot } from '#utils/path_resolver.js'
import express from 'express'
import path from 'path'

export const app = express()

//* ------------------------------- Middlewares ------------------------------ */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(projectRoot, '/public')))

//* --------------------------------- Routes --------------------------------- */
app.get(['/', '/index', '/index.html'], (req, res) => {
	res.sendFile(path.join(projectRoot, 'view', 'index.html'))
})
