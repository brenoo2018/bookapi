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
