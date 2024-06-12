import { NextFunction, Request, Response } from 'express'
import { hash } from 'bcrypt'
import { User } from '../models'
import { UserRepository } from '../repositories/user.repository'

export class UserController {
	private userRepository: UserRepository
	constructor() {
		this.userRepository = new UserRepository()
	}
	async index(request: Request, response: Response, next: NextFunction) {
		const { page, size } = request.query

		const DEFAULT_PAGE = 1
		const DEFAULT_SIZE = 1
		const pageNumber = page ? parseInt(page as string, 10) : DEFAULT_PAGE
		const sizeNumber = size ? parseInt(size as string, 10) : DEFAULT_SIZE
		try {
			const result = await this.userRepository.findAll({
				page: pageNumber,
				size: sizeNumber,
			})

			return response.json(result)
		} catch (error) {
			next(error)
		}
	}
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
