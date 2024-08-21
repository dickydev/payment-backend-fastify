// src/controllers/transactionController.ts

import { FastifyReply, FastifyRequest } from 'fastify';
import { TransactionService } from '../services/transactionService';

export class TransactionController {
  private transactionService = new TransactionService();

  async createTransaction(request: FastifyRequest, reply: FastifyReply) {
    const { amount, toAddress, status, accountId } = request.body as { amount: number; toAddress: string; status: string; accountId: number };

    try {
      const transaction = await this.transactionService.createTransaction(amount, toAddress, status, accountId);
      reply.code(201).send(transaction);
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  async getTransaction(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
      const transaction = await this.transactionService.getTransactionById(parseInt(id));
      if (!transaction) {
        reply.code(404).send({ error: 'Transaction not found' });
      } else {
        reply.send(transaction);
      }
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  async getTransactions(request: FastifyRequest, reply: FastifyReply) {
    const { accountId } = request.params as { accountId: string };

    try {
      const transactions = await this.transactionService.getTransactionsByAccountId(parseInt(accountId));
      reply.send(transactions);
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  async processTransaction(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
      const transaction = await this.transactionService.getTransactionById(parseInt(id));
      if (!transaction) {
        reply.code(404).send({ error: 'Transaction not found' });
        return;
      }

      await this.transactionService.processTransaction(transaction);
      reply.send({ message: 'Transaction processed successfully' + transaction });
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }
}
