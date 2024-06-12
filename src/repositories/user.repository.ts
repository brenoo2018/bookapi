import { User } from '../models'

type TCreate = {
	name: string
	email: string
	password: string
}

type TPage = {
	page: number
	size: number
}

export class UserRepository {
	async findByEmail(email: string) {
		const result = await User.findOne({ email })
		return result
	}
	async create({ name, email, password }: TCreate) {
		const result = await User.create({
			name,
			email,
			password,
		})
		return result
	}
	async findAll({ page, size }: TPage) {
		const result = await User.find()
			.skip((page - 1) * size)
			.limit(size)
			.exec()
		return result
	}
}
