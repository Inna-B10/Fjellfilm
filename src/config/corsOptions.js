import { isDev } from '#utils/isDev.js'

export const corsOptions = {
	origin: (origin, callback) => {
		const allowedOrigins = ['http://localhost:4200', 'http://127.0.0.1:5500', 'https://fjellfilm.onrender.com']

		if (allowedOrigins.includes(origin) || (isDev && !origin)) {
			callback(null, true)
		} else {
			callback(new Error('Blocked by CORS'))
		}
	},
	optionsSuccessStatus: 200,
}
