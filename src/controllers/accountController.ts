import { FastifyReply, FastifyRequest } from 'fastify';
import { AccountService } from '../services/accountService';

export class AccountController {
  private accountService = new AccountService();

  async createAccount(request: FastifyRequest, reply: FastifyReply) {
    const { userId, type, balance } = request.body as { userId: number; type: string; balance: number };

    try {
      const account = await this.accountService.createAccount(userId, type, balance);
      reply.code(201).send(account);
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  async getAccounts(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as { userId: string };

    try {
      const accounts = await this.accountService.getAccountsByUserId(parseInt(userId));
      reply.send(accounts);
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  async getAccount(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
      const account = await this.accountService.getAccountById(parseInt(id));
      if (!account) {
        reply.code(404).send({ error: 'Account not found' });
      } else {
        reply.send(account);
      }
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }
}
