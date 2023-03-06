import { getUsers,login } from "./user.swagger";

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
  ],
  paths:{
    "/ping":{
      "get":{
        "responses":{
          '200':{
            "content":{
              "text/html; charset=utf-8":{
                "schema":{
                  type: "string",
                "examples": {}
                }
              }
            }
          }
        }
      }
      },
      "/api/auth/login":{
      "post":login
      },
    "/api/users":{
      "get":getUsers,
    },
  }
}