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
            description: "A list of blogs.",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties:{
                            success:{
                                type:"boolean"
                            },
                            data: {
                                type:"array",
                                items:{
                                    type:"object",
                                    properties:{
                                        id: {
                                            type: 'number',
                                        },
                                        username: {
                                            type: 'string',
                                        },
                                        name: {
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
        }
    }
} 

export const getUser = {
    tags: ['Users'],
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties:{
                            success:{
                                type:"boolean"
                            },
                            data:{
                                type:"object",
                                properties:{
                                id:{
                                    type:"number",
                                },
                                name:{
                                    type:"string"
                                },
                                username:{
                                    type:"string"
                                }
                            }
                            }

                        }
                    }
                }
            }
        }
    }
} 


export const addUser = {
    tags: ['Users'],
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        password:{
                            type:"string",
                        },
                        name:{
                            type:"string"
                        },
                        username:{
                            type:"string"
                        }
                    }
                }
            }
        },
        examples:{
            '0':{
                value:{
                    "username": "mahlet",
                    "name": "mahletsuper",
                    "password": "tewesta"
                }
            }
        }
    },
    responses: {
        "201": {          
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties:{
                            success:{
                                type:"boolean"
                            },
                            data:{
                                type:"object",
                                properties:{
                                message:{
                                    type:"string",
                                },
                                id_user:{
                                    type:"number"
                                }
                            }
                            }

                        }
                    }
                }
            }
        }
    }
} 


export const updateUser = {
    tags: ['Users'],
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        name:{
                            type:"string"
                        },
                        username:{
                            type:"string"
                        }
                    }
                }
            }
        }
    },
    responses: {
        "200": {          
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties:{
                            success:{
                                type:"boolean"
                            },
                            data:{
                                type:"object",
                                properties:{
                                message:{
                                    type:"string",
                                }
                            }
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
    responses: {
        "200": {          
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties:{
                            success:{
                                type:"boolean"
                            },
                            data:{
                                type:"object",
                                properties:{
                                message:{
                                    type:"string",
                                },
                                authToken:{
                                    type:"string"
                                },
                                user:{
                                    type:"object",
                                    properties:{
                                        id:{
                                            type:"number"
                                        },
                                        username:{
                                            type:"string"
                                        }
                                    }
                                }
                            }
                            }

                        }
                    }
                }
            }
        }
    }
}

