import mongoose from 'mongoose'

export class DbConnection {
	async connect() {
		try {
			await mongoose.connect(process.env.DATABASE_URL!)
			console.log('Database connected')
		} catch (error) {
			console.error('Error to connect database', error)
		}
	}
}
