import { PrismaClient, PaymentAccount } from '@prisma/client';
const prisma = new PrismaClient();

export class AccountService {
  async createAccount(userId: number, accountType: string, balance: number): Promise<PaymentAccount> {
    return prisma.paymentAccount.create({
      data: {
        userId,
        accountType,
        balance,
      },
    });
  }

  async getAccountsByUserId(userId: number): Promise<PaymentAccount[]> {
    return prisma.paymentAccount.findMany({
      where: { userId },
    });
  }

  async getAccountById(id: number): Promise<PaymentAccount | null> {
    return prisma.paymentAccount.findUnique({
      where: { id },
    });
  }
}
