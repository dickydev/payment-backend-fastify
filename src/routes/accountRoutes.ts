import { FastifyInstance } from 'fastify';
import { AccountController } from '../controllers/accountController';

export async function accountRoutes(app: FastifyInstance) {
  const accountController = new AccountController();

  app.post('/accounts', {
    schema: {
      body: {
        type: 'object',
        required: ['userId', 'type', 'balance'],
        properties: {
          userId: { type: 'integer' },
          type: { type: 'string' },
          balance: { type: 'number' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            userId: { type: 'integer' },
            type: { type: 'string' },
            balance: { type: 'number' }
          }
        }
      }
    },
    handler: accountController.createAccount.bind(accountController)
  });

  app.get('/accounts/user/:userId', {
    schema: {
      params: {
        type: 'object',
        properties: {
          userId: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              userId: { type: 'integer' },
              type: { type: 'string' },
              balance: { type: 'number' }
            }
          }
        }
      }
    },
    handler: accountController.getAccounts.bind(accountController)
  });

  app.get('/accounts/:id', {
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
            userId: { type: 'integer' },
            type: { type: 'string' },
            balance: { type: 'number' }
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
    handler: accountController.getAccount.bind(accountController)
  });
}
