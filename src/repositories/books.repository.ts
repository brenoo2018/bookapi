import { Books } from '../models'

type TCreateBook = {
	name: string
	author: string
	company: string
	read: boolean
	dateRead: Date
	description: string
	rate: number
	user_id: string
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
}
