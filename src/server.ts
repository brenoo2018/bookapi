import express, { Application, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'

import { UserRoutes } from './routes/user.routes'
import { DbConnection } from './database'
import { BookRoutes } from './routes/books.routes'
import { swaggerSpec } from './utils/swagger'

dotenv.config()

const app: Application = express()
const userRoutes = new UserRoutes().getRoutes()
const bookRoutes = new BookRoutes().getRoutes()
const database = new DbConnection()
const port = 3333

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', userRoutes)
app.use('/books', bookRoutes)
app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, {
		swaggerOptions: {
			url: '/swagger.json',
		},
	})
)
database.connect()

app.use(
	(error: Error, request: Request, response: Response, next: NextFunction) => {
		if (error instanceof Error) {
			return response.status(400).json({
				error: error.message,
			})
		}
		return response.status(500).json({
			status: 'error',
			message: 'Internal Server Error',
		})
	}
)

app.listen(port, () => console.log(`Server is running on port ${port}`))
