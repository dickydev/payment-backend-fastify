import Fastify from 'fastify';
import OAS from 'fastify-oas';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { userRoutes } from './routes/userRoutes';
import { transactionRoutes } from './routes/transactionRoutes';
import { accountRoutes } from './routes/accountRoutes';

dotenv.config();

const prisma = new PrismaClient();
const fastify = Fastify({ logger: true });

// Register OAS
fastify.register(OAS, {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Bank API',
        description: 'API documentation for the bank project',
        version: '1.0.0'
      },
      tags: [
        { name: 'user', description: 'User related endpoints' },
        { name: 'transaction', description: 'Transaction related endpoints' },
        { name: 'account', description: 'Account related endpoints' }
      ],
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      definitions: {
        User: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string' },
            password: { type: 'string' }
          }
        },
        Account: {
          type: 'object',
          required: ['userId', 'type', 'balance'],
          properties: {
            userId: { type: 'integer' },
            type: { type: 'string' },
            balance: { type: 'number' }
          }
        },
        Transaction: {
          type: 'object',
          required: ['amount', 'toAddress', 'status', 'accountId'],
          properties: {
            amount: { type: 'number' },
            toAddress: { type: 'string' },
            status: { type: 'string' },
            accountId: { type: 'integer' }
          }
        }
      },
      externalDocs: {
        url: 'https://example.com',
        description: 'Find more info here'
      }
    },
    exposeRoute: true
  });
  
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Register routes
fastify.register(accountRoutes);
fastify.register(userRoutes);
fastify.register(transactionRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Server listening on http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
