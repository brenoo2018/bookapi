import express, { NextFunction, Request, Response } from 'express'
import { UserRoutes } from './routes/user.routes'

const app = express()
const userRoutes = new UserRoutes().getRoutes()
const port = 3333

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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
