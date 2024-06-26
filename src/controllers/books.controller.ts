import { NextFunction, Request, Response } from 'express'
import { BooksRepository } from '../repositories/books.repository'

export class BooksController {
	private booksRepository: BooksRepository
	constructor() {
		this.booksRepository = new BooksRepository()
	}
	async store(request: Request, response: Response, next: NextFunction) {
		const { name, author, company, read, dateRead, description, rate } =
			request.body
		const { user_id } = request
		try {
			const readVerify = read ? true : false
			const dateReadVerify = dateRead ? new Date(dateRead) : null
			const findBooksByUserId = await this.booksRepository.findByUserId(user_id)

			const findBooks = findBooksByUserId.find(
				(book, index) =>
					book.name &&
					StringFormatter.format(book.name) === StringFormatter.format(name)
			)

			if (findBooks) {
				throw new Error('Book already exists')
			}

			if (!readVerify && rate) {
				throw new Error('You can grade only books that have been read')
			}

			const result = await this.booksRepository.create({
				name,
				author,
				company,
				read: readVerify,
				dateRead: dateReadVerify,
				description,
				rate,
				user_id: request.user_id,
			})

			return response.json(result).status(201)
		} catch (error) {
			next(error)
		}
	}
	async index(request: Request, response: Response, next: NextFunction) {
		const { user_id } = request
		const { page, size } = request.query

		const DEFAULT_PAGE = 1
		const DEFAULT_SIZE = 1
		try {
			const pageAsNumber = page ? Number(page) : DEFAULT_PAGE
			const sizeAsNumber = size ? Number(size) : DEFAULT_SIZE

			const result = await this.booksRepository.findByUserIdPaginate({
				user_id,
				page: pageAsNumber,
				limit: sizeAsNumber,
			})
			return response.json(result).status(200)
		} catch (error) {
			next(error)
		}
	}
	async delete(request: Request, response: Response, next: NextFunction) {
		const { id } = request.params
		const { user_id } = request
		try {
			const findById = await this.booksRepository.findById(id, user_id)

			if (!findById || findById.length <= 0) {
				throw new Error('Book not found')
			}

			const result = await this.booksRepository.delete(id)
			return response.json(result).status(200)
		} catch (error) {
			next(error)
		}
	}
	async update(request: Request, response: Response, next: NextFunction) {
		const { id } = request.params
		const { user_id } = request
		const { rate } = request.body

		try {
			if (!rate) {
				throw new Error('Rate is required')
			}

			if (rate < 0 || rate > 5) {
				throw new Error('Rate must be a number between 0 and 5')
			}

			const findById = await this.booksRepository.findById(id, user_id)

			if (!findById || findById.length <= 0) {
				throw new Error('Book not found')
			}

			const result = await this.booksRepository.update({
				id,
				read: true,
				dateRead: new Date(),
				rate,
			})

			return response.json(result).status(200)
		} catch (error) {
			next(error)
		}
	}
}

class StringFormatter {
	static format(value: string) {
		return value.trim().toLowerCase().normalize('NFD')
	}
}
