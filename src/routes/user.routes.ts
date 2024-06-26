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
		/**
		 * @swagger
		 * /user:
		 *   post:
		 *     summary: Create user
		 *     description: Create user
		 *     parameters:
		 *       - in: body
		 *         name: name
		 *         schema:
		 *           type: string
		 *           example: John Doe
		 *       - in: body
		 *         name: email
		 *         schema:
		 *           type: string
		 *           example: john.doe@example.com
		 *       - in: body
		 *         name: password
		 *         schema:
		 *           type: string
		 *           example: password123
		 *     requestBody:
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             properties:
		 *               name:
		 *                 type: string
		 *               email:
		 *                 type: string
		 *               password:
		 *                 type: string
		 *             example:
		 *               name: John Doe
		 *               email: john.doe@example.com
		 *               password: password123
		 *     responses:
		 *       201:
		 *         description: User created
		 *         content:
		 *           application/json:
		 *             schema:
		 *               type: object
		 *               properties:
		 *                 _id:
		 *                   type: string
		 *                 name:
		 *                   type: string
		 *                 email:
		 *                   type: string
		 *                 password:
		 *                   type: string
		 *                 __v:
		 *                   type: integer
		 *       400:
		 *         description: Bad request
		 *       401:
		 *         description: Unauthorized
		 *       500:
		 *         description: Internal server error
		 */

		this.router.post('/', this.userController.store.bind(this.userController))
		this.router.get('/', this.userController.index.bind(this.userController))
		this.router.get('/:id', this.userController.show.bind(this.userController))
		this.router.put(
			'/:id',
			this.userController.update.bind(this.userController)
		)
		this.router.delete(
			'/:id',
			this.userController.delete.bind(this.userController)
		)

		return this.router
	}
}
