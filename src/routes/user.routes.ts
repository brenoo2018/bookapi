import { Router } from 'express'
import { UserController } from '../controllers/user.controller'

export class UserRoutes {
	private router: Router
	private userController: UserController

	constructor() {
		this.router = Router()
		this.userController = new UserController()
	}

	getRoutes() {
		this.router.post('/', this.userController.store.bind(this.userController))
		this.router.get('/', this.userController.index.bind(this.userController))

		return this.router
	}
}
