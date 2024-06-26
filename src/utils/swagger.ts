import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
	definition: {
		info: {
			title: 'Hello World',
			version: '1.0.0',
			contact: {
				name: '',
				email: '',
			},
		},
	},
	apis: ['**/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)
