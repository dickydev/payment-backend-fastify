import { FastifyInstance } from 'fastify';
import { TransactionController } from '../controllers/transactionController';

export async function transactionRoutes(app: FastifyInstance) {
  const transactionController = new TransactionController();

  app.post('/transactions', {
    schema: {
      body: {
        type: 'object',
        required: ['amount', 'toAddress', 'status', 'accountId'],
        properties: {
          amount: { type: 'number' },
          toAddress: { type: 'string' },
          status: { type: 'string' },
          accountId: { type: 'integer' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            amount: { type: 'number' },
            toAddress: { type: 'string' },
            status: { type: 'string' },
            accountId: { type: 'integer' }
          }
        }
      }
    },
    handler: transactionController.createTransaction.bind(transactionController)
  });

  app.get('/transactions/:id', {
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
            amount: { type: 'number' },
            toAddress: { type: 'string' },
            status: { type: 'string' },
            accountId: { type: 'integer' }
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
    handler: transactionController.getTransaction.bind(transactionController)
  });

  app.get('/transactions/account/:accountId', {
    schema: {
      params: {
        type: 'object',
        properties: {
          accountId: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              amount: { type: 'number' },
              toAddress: { type: 'string' },
              status: { type: 'string' },
              accountId: { type: 'integer' }
            }
          }
        }
      }
    },
    handler: transactionController.getTransactions.bind(transactionController)
  });

  app.post('/transactions/process/:id', {
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
            message: { type: 'string' }
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
    handler: transactionController.processTransaction.bind(transactionController)
  });
}
