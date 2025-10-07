import '#utils/loadEnv.js' //first load dotenv

import { gracefulShutdown } from '#utils/gracefulShutdown.js'

import { app } from './app.js'

const PORT = process.env.PORT || 4200

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

// Signals
process.on('SIGINT', () => gracefulShutdown())
process.on('SIGTERM', () => gracefulShutdown())

// Unexpected errors
process.on('uncaughtException', err => gracefulShutdown(err))
process.on('unhandledRejection', err => gracefulShutdown(err))
