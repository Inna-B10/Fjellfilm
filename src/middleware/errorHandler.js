import { isDev } from '#utils/isDev.js'
import { rootDir } from '#utils/path_resolver.js'
import { existsSync } from 'fs'
import * as fsPromises from 'fs/promises'
import path from 'path'

export async function errorHandler(err, req, res, next) {
	const logMessage = `[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl} - ${err.stack}\n`

	try {
		//check if folder exists
		if (!existsSync(path.join(rootDir, 'logs'))) {
			await fsPromises.mkdir(path.join(rootDir, 'logs'))
		}

		// write to the file
		const logsDir = path.join(rootDir, 'logs')
		const logPath = path.join(logsDir, 'errors.log')

		await fsPromises.appendFile(logPath, logMessage)
	} catch (fsErr) {
		console.error('Failed to write log:', fsErr)
	}

	// log in console
	isDev && console.error(logMessage)

	//response to client
	res.status(500).json({ error: 'Internal Server Error' })
}
