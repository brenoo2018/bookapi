import express, { Application, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'

import { UserRoutes } from './routes/user.routes'
import { DbConnection } from './database'

dotenv.config()

const app: Application = express()
const userRoutes = new UserRoutes().getRoutes()
const database = new DbConnection()
const port = 3333

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
database.connect()
app.use('/', userRoutes)
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
