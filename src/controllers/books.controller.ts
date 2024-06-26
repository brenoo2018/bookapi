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

			// return response.json(result).status(201)
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
