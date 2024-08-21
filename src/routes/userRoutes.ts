import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/userController';

export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController();

  app.post('/users/register', {
    schema: {
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            username: { type: 'string' },
            password: { type: 'string' }
          }
        }
      }
    },
    handler: userController.registerUser.bind(userController)
  });

  app.get('/users/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            username: { type: 'string' },
            password: { type: 'string' }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    },
    handler: userController.getUser.bind(userController)
  });
}
