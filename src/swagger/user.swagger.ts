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