interface dbClient {
	user: string
	password: string | undefined
	database: string
	host: string
    port: number
	ssl: boolean
	max: number
	idleTimeoutMillis: number
}


export const dbObj: dbClient = {
	user: 'yisacc',
	password: 'tewabech',
	database: 'medicaldepartures',
	host: 'database-1.cd5jchlywb3z.eu-central-1.rds.amazonaws.com',
    port: 5432,
	ssl: false,
	max: 20,
    idleTimeoutMillis: 10000
}

export const server = {
	port: 9000,
	apiUuid: '0eb14adc-a16e-400c-8f55-7d6c016bb36d',
	tokenExpiration: {
		days: 1,
		hours: 8,
		minutes: 0,
		seconds: 0,
	}
}

export const bcrypt = {
	saltRounds: 10,
}





