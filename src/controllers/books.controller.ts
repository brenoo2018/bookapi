import { NextFunction, Request, Response } from 'express'
import { BooksRepository } from '../repositories/books.repository'

export class BooksController {
	private booksRepository: BooksRepository
	constructor() {
		this.booksRepository = new BooksRepository()
	}
	store(request: Request, response: Response, next: NextFunction) {
		const { name, author, company, read, dateRead, description, rate } =
			request.body
		try {
			return response.json({ ok: request.user_id })
		} catch (error) {
			next(error)
		}
	}
}
