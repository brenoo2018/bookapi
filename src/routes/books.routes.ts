import { Router } from 'express'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'
import { BooksController } from '../controllers/books.controller'

export class BookRoutes {
	private router: Router
	private authMiddleware: AuthMiddleware
	private bookController: BooksController

	constructor() {
		this.router = Router()
		this.authMiddleware = new AuthMiddleware()
		this.bookController = new BooksController()
	}

	getRoutes() {
		this.router.post(
			'/',
			this.authMiddleware.auth.bind(this.authMiddleware),
			this.bookController.store.bind(this.bookController)
		)
		this.router.get(
			'/',
			this.authMiddleware.auth.bind(this.authMiddleware),
			this.bookController.index.bind(this.bookController)
		)
		return this.router
	}
}
