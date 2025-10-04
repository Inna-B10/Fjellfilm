import { gracefulShutdown } from '#utils/gracefulShutdown.js'
import dotenv from 'dotenv'
import { app } from './app.js'

dotenv.config()

const PORT = process.env.PORT || 4200

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
