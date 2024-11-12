import express from 'express'
import cors from 'cors'
import { requestLogger } from './support/logger.js'
import { errorHandler, badJsonHandler, notFoundHandler } from './middlewares/index.js'
import loadRoutes from './loaders/routes.js'
import './loaders/config.js'
import helmet from 'helmet'
import csurf from 'csurf'

const app = express()

/**
 * Enable CORS
 */
app.use(cors())

/**
 * Set up security headers.
 */
app.use(helmet())

/**
 * Set up CSRF protection.
 */
app.use(csurf())

/**
 * Log requests
 */
app.use(requestLogger)

/**
 * Parse JSON body
 */
app.use(express.json())

/**
 * Handle bad JSON format
 */
app.use(badJsonHandler)

/**
 * Load routes
 */
loadRoutes(app)

/**
 * Handle 404 not found error
 */
app.use(notFoundHandler)

/**
 * Catch all errors
 */
app.use(errorHandler)

export default app
