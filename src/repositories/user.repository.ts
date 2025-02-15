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
	async findById(id: string) {
		const result = await User.findById(id)
		return result
	}
	async updatePassword(id: string, password: string) {
		await User.findByIdAndUpdate(id, { password })
	}
	async updateName(id: string, name: string) {
		await User.findByIdAndUpdate(id, { name })
	}
	async delete(id: string) {
		return await User.findByIdAndDelete(id)
	}
}
