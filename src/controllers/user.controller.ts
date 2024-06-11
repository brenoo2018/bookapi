import { NextFunction, Request, Response } from 'express'

export class UserController {
	index(request: Request, response: Response, next: NextFunction) {}
	show(request: Request, response: Response, next: NextFunction) {}
	store(request: Request, response: Response, next: NextFunction) {
		const { name, email, password } = request.body
		try {
		} catch (error) {
			return response.json({})
		}
	}
	update(request: Request, response: Response, next: NextFunction) {}
}
