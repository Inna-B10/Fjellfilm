import { db } from '#database/database.js'
import { isDev } from './isDev.js'

export const gracefulShutdown = () => {
	isDev && console.log('Shutting down...')

	try {
		db.close()
		isDev && console.log('Database connection closed.')
		process.exit(0)
	} catch (err) {
		console.error('Failed to close database connection', err.message)
		process.exit(1)
	}
}
