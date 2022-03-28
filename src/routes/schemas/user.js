const getUsersSchema = {
  schema: {
    description: 'Get Users',
    tags: ['user'],
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
            users: { 
                type: 'array', 
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'number',
                            example: 6,
                        },
                        name: {
                            type: 'string',
                            example: 'Test',
                        },
                        lastname: {
                            type: 'string',
                            example: 'Testname',
                        },
                    }
                } 
            }
        }
      },
    },
  }
}
const getUserByIdSchema = {
  schema: {
    description: 'Get Users',
    tags: ['user'],
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'user id'
        }
      }
    },
    response: {
      200: {
        description: 'User info',
        type: 'object',
        properties: {
          id: {
              type: 'number',
              example: 6,
          },
          name: {
              type: 'string',
              example: 'Test',
          },
          lastname: {
              type: 'string',
              example: 'Testname',
          },
        }
      },
    },
  }
}
const postNewUserSchema = {
  schema: {
    description: 'Create user',
    tags: ['user'],
    body: {
      type: 'object',
      required: ['name', 'lastname'],
      properties: {
        name: {
            type: 'string',
            example: 'Test',
        },
        lastname: {
            type: 'string',
            example: 'Testname',
        },
      }
    },
    response: {
      201: {
        description: 'New user',
        type: 'object',
        properties: {
          msg: {
            type: 'string',
            example: 'Se pudo crear el ususario'
          },
          user: {
            type: 'object',
            properties: {
              id: {
                  type: 'number',
                  example: 6,
              },
              name: {
                  type: 'string',
                  example: 'Test',
              },
              lastname: {
                  type: 'string',
                  example: 'Testname',
              },
            },
          },
        }
      },
    },
  }
}
const putUserSchema = {
  schema: {
    description: 'Overwrite user',
    tags: ['user'],
    body: {
      type: 'object',
      required: ['name', 'lastname'],
      properties: {
        name: {
            type: 'string',
            example: 'Test',
        },
        lastname: {
            type: 'string',
            example: 'Testname',
        },
      }
    },
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'user id'
        }
      }
    },
    response: {
      200: {
        description: 'User overwrited',
        type: 'object',
        properties: {
          id: {
              type: 'number',
              example: 6,
          },
          name: {
              type: 'string',
              example: 'Test',
          },
          lastname: {
              type: 'string',
              example: 'Testname',
          },
        },
      },
      404: {
        description: 'User not found',
        type: 'object',
        properties: {
          msg: {
              type: 'string',
              example: 'No existe el usuario Nº',
          },
        },
      },
    },
  }
}
const patchUserSchema = {
  schema: {
    description: 'Partial update user',
    tags: ['user'],
    body: {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: {
            type: 'string',
            example: 'Test',
        },
        lastname: {
            type: 'string',
            example: 'Testname',
        },
      }
    },
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'user id'
        }
      }
    },
    response: {
      200: {
        description: 'User updated',
        type: 'object',
        properties: {
          id: {
              type: 'number',
              example: 6,
          },
          name: {
              type: 'string',
              example: 'Test',
          },
          lastname: {
              type: 'string',
              example: 'Testname',
          },
        },
      },
      404: {
        description: 'User not found',
        type: 'object',
        properties: {
          msg: {
              type: 'string',
              example: 'No existe el usuario Nº',
          },
        },
      },
    },
  }
}
const deleteUserSchema = {
  schema: {
    description: 'Delete user',
    tags: ['user'],
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'user id'
        }
      }
    },
    response: {
      200: {
        description: 'User deleted',
        type: 'object',
        properties: {
          id: {
              type: 'number',
              example: 6,
          },
          name: {
              type: 'string',
              example: 'Test',
          },
          lastname: {
              type: 'string',
              example: 'Testname',
          },
        },
      },
      404: {
        description: 'User not found',
        type: 'object',
        properties: {
          msg: {
              type: 'string',
              example: 'No existe el usuario Nº',
          },
        },
      },
    },
  }
}

module.exports = {
    getUsersSchema,
    getUserByIdSchema,
    postNewUserSchema,
    putUserSchema,
    deleteUserSchema,
    patchUserSchema
};