import { Books } from '../models'

type TCreateBook = {
	name: string
	author: string
	company: string
	read: boolean
	dateRead: Date | null
	description: string
	rate: number
	user_id: string
}

type TUpdateBook = {
	id: string
	read: boolean
	dateRead: Date
	rate: number
}

export class BooksRepository {
	async create({
		name,
		author,
		company,
		read,
		dateRead,
		description,
		rate,
		user_id,
	}: TCreateBook) {
		const result = await Books.create({
			name,
			author,
			company,
			read,
			dateRead,
			description,
			rate,
			user_id,
		})

		return result
	}
	async findByUserId(user_id: string) {
		const result = await Books.find({ user_id })

		return result
	}
	async findByUserIdPaginate({
		user_id,
		page,
		limit,
	}: {
		user_id: string
		page: number
		limit: number
	}) {
		const result = await Books.find({ user_id })
			.skip((page - 1) * limit)
			.limit(limit)
			.exec()

		return result
	}
	findById(id: string, user_id: string) {
		return Books.find({
			_id: id,
			user_id,
		}).exec()
	}
	delete(id: string) {
		return Books.findByIdAndDelete({ _id: id }).exec()
	}
	async update({ id, read, dateRead, rate }: TUpdateBook) {
		await Books.findByIdAndUpdate(id, {
			read,
			dateRead,
			rate,
		})
	}
}
