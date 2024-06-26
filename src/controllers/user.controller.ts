import { NextFunction, Request, Response } from 'express'
import { compare, hash } from 'bcrypt'
import { User } from '../models'
import { UserRepository } from '../repositories/user.repository'
import { log } from 'console'

type TUpdateData = {
	name: string
	password: string
}

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
	async show(request: Request, response: Response, next: NextFunction) {
		const { id } = request.params
		try {
			const result = await this.userRepository.findById(id)
			return response.json(result)
		} catch (error) {
			next(error)
		}
	}

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

			return response.json(createUser).status(201)
		} catch (error) {
			next(error)
		}
	}
	async update(request: Request, response: Response, next: NextFunction) {
		const { id } = request.params
		const { name, password, oldPassword } = request.body
		try {
			const findUser = await this.userRepository.findById(id)
			if (!findUser) {
				throw new Error('User not found')
			}

			if (password && oldPassword && findUser.password) {
				const passwordMatch = await compare(oldPassword, findUser.password)

				if (!passwordMatch) {
					throw new Error('password does not match')
				}

				const hashPaswword = await hash(password, 10)
				await this.userRepository.updatePassword(id, hashPaswword)
			}

			if (name) {
				await this.userRepository.updateName(id, name)
			}

			return response.json({ message: 'Update sucessfully' })
		} catch (error) {
			console.log('🚀 ~ UserController ~ update ~ error:', error)
			next(error)
		}
	}
	async delete(request: Request, response: Response, next: NextFunction) {
		const { id } = request.params
		try {
			const findUser = await this.userRepository.findById(id)
			if (!findUser) {
				throw new Error('User not found')
			}

			const result = await this.userRepository.delete(id)
			return response.json(result)
		} catch (error) {
			next(error)
		}
	}
}
