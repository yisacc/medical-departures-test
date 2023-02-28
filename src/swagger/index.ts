export const swaggerDocument = {
  openapi: '3.0.2',
  info: {
      version: '1.0.0',
      title: 'Medical Departures Test API',
      description: 'Website documentation to create a CRUD blog API with authentication in NodeJs using TypeScript',
      termsOfService: '',
      contact: {
          name: 'Yisacc Aberham',
          email: 'isaccab2019@gmail.com',
      }
  },
  servers:[
    {
      url:'http://localhost:3000/api',
      description:'Local Server'
    }
  ]
}