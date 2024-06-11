import { NextFunction, Request, Response } from 'express'
import { hash } from 'bcrypt'
import { User } from '../models'
import { UserRepository } from '../repositories/user.repository'

export class UserController {
	private userRepository: UserRepository
	constructor() {
		this.userRepository = new UserRepository()
	}
	index(request: Request, response: Response, next: NextFunction) {}
	show(request: Request, response: Response, next: NextFunction) {}
	async store(request: Request, response: Response, next: NextFunction) {
		const { name, email, password } = request.body
		try {
			const findUser = await this.userRepository.findByEmail(email)
			if (findUser) {
				throw new Error('User already exists')
			}

			const hashPaswword = await hash(password, 10)

			const createUser = await this.userRepository.create({
				name,
				email,
				password: hashPaswword,
			})

			return response.json(createUser)
		} catch (error) {
			next(error)
		}
	}
	update(request: Request, response: Response, next: NextFunction) {}
}
