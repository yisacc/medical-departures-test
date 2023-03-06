

export const getBlogs = {
    tags: ['Blogs'],
    description: "Returns all blogs from the system",
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
                                        title: {
                                            type: 'string',
                                        },
                                        author: {
                                            type: 'string',
                                        },
                                        url: {
                                            type: 'string',
                                        },
                                        deleted: {
                                            type: 'boolean',
                                        },
                                        creator:{
                                            type:"string"
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
} 

export const getBlog = {
    tags: ['Blogs'],
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
                                    id: {
                                        type: 'number',
                                    },
                                    title: {
                                        type: 'string',
                                    },
                                    author: {
                                        type: 'string',
                                    },
                                    url: {
                                        type: 'string',
                                    },
                                    deleted: {
                                        type: 'boolean',
                                    },
                                    creator:{
                                        type:"string"
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


export const addBlog = {
    tags: ['Blogs'],
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
                        title:{
                            type:"string",
                        },
                        author:{
                            type:"string"
                        },
                        url:{
                            type:"string"
                        }
                    }
                }
            }
        },
        examples:{
            '0':{
                value:{
                    "title": "hjkknknkn",
                    "author": "dostovosdfdfdfkey",
                    "url": "not provided"
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
                                        type:"string"
                                    },
                                    id_blog:{
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


export const updateBlog = {
    tags: ['Blogs'],
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
                        title:{
                            type:"string",
                        },
                        author:{
                            type:"string"
                        },
                        url:{
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


