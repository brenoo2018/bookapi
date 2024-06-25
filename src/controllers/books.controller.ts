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
			const findBooksByUserId = await this.booksRepository.findByUserId(user_id)
			console.log(
				'🚀 ~ BooksController ~ store ~ findBooksByUserId:',
				findBooksByUserId
			)

			const findBooks = findBooksByUserId.find(
				(book, index) =>
					book.name &&
					StringFormatter.format(book.name) === StringFormatter.format(name)
			)

			if (findBooks) {
				throw new Error('Book already exists')
			}

			// const result = await this.booksRepository.create({
			// 	name,
			// 	author,
			// 	company,
			// 	read,
			// 	dateRead,
			// 	description,
			// 	rate,
			// 	user_id: request.user_id,
			// })

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
