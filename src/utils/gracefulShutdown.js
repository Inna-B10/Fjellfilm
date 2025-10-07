import { db } from '#database/database.js'
import { isDev } from './isDev.js'

export const gracefulShutdown = (error = null) => {
	if (error) {
		console.error('Unexpected error during shutdown: ', error)
		process.exitCode = 1
	} else {
		process.exitCode = 0
	}

	try {
		db.close()
		isDev && console.log('Database connection closed.')
	} catch (err) {
		console.error('Failed to close database connection', err.message)
	}

	isDev && console.log(`Graceful shutdown completed with exitCode=${process.exitCode}`)
}
