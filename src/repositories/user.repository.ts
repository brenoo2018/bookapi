import { User } from '../models'

type TCreate = {
	name: string
	email: string
	password: string
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
}
