import { PrismaClient, Transaction } from '@prisma/client';

const prisma = new PrismaClient();

export class TransactionService {
  async createTransaction(amount: number, toAddress: string, status: string, accountId: number): Promise<Transaction> {
    return prisma.transaction.create({
      data: {
        amount,
        toAddress,
        status,
        accountId,
      },
    });
  }

  async getTransactionById(id: number): Promise<Transaction | null> {
    return prisma.transaction.findUnique({
      where: { id },
    });
  }

  async getTransactionsByAccountId(accountId: number): Promise<Transaction[]> {
    return prisma.transaction.findMany({
      where: { accountId },
    });
  }

  async processTransaction(transaction: Transaction): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      console.log('Transaction processing started for:', transaction);
      setTimeout(() => {
        console.log('Transaction processed for:', transaction);
        resolve(transaction);
      }, 30000); // 30 seconds
    });
  }
}
