export const getUsers = {
    tags: ['Users'],
    description: "Returns all users from the system",
    operationId: 'getUsers',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "A list of users.",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            name: {
                                type: 'string',
                                description: 'User Name'
                            },
                            username: {
                                type: 'string',
                            },
                            deleted: {
                                type: 'boolean',
                            }
                        }
                    }
                }
            }
        }
    }
} 

export const login={
    tags: ['Auth'],
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        password:{
                            type:"string",
                        },
                        username:{
                            type:"string"
                        }
                    }
                }
            }
        }
    },
    responses:{
        '201':{
            content:{
                "application/json; charset=utf-8":{
                    schema:{
                        type:"string"
                    }
                }
            }
        }
    }
}