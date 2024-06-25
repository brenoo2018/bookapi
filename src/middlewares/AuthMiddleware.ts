import { NextFunction, Request, Response } from 'express'
import { UserRepository } from '../repositories/user.repository'

export class AuthMiddleware {
	private userRepository: UserRepository
	constructor() {
		this.userRepository = new UserRepository()
	}
	async auth(request: Request, response: Response, next: NextFunction) {
		const authHeader: string = request.headers.email as string

		if (!authHeader) {
			return response.status(401).json({
				code: 'token.missing',
				error: 'Token missing',
			})
		}

		const findUser = await this.userRepository.findByEmail(authHeader)

		request.user_id = findUser?.id

		if (!findUser) {
			return response.status(400).json({
				code: 'token.not.found',
				error: 'Token not found',
			})
		}

		return next()
	}
}
