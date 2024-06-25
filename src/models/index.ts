import { randomUUID } from 'crypto'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: randomUUID(),
	},
	name: String,
	email: String,
	password: String,
})
export const User = mongoose.model('User', userSchema)

const bookSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: randomUUID(),
	},
	name: String,
	author: String,
	company: String,
	read: Boolean,
	dateRead: Date,
	description: String,
	rate: Number,
	user_id: {
		type: String,
		ref: 'User',
		required: true,
	},
})

export const Books = mongoose.model('Book', bookSchema)
