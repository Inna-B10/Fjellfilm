import { projectRoot } from '#utils/path_resolver.js'
import { Router } from 'express'
import path from 'path'

export const rootRouter = Router()

rootRouter.get('/', (req, res) => {
	res.sendFile(path.join(projectRoot, 'view', 'index.html'))
})

rootRouter.get('/:page{.:html}', (req, res, next) => {
	const pagePath = path.join(projectRoot, 'view', `${req.params.page}.html`)

	res.sendFile(pagePath, err => {
		if (err) next()
	})
})
