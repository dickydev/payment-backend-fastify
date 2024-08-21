import { PrismaClient, PaymentAccount } from '@prisma/client';
const prisma = new PrismaClient();

export class AccountService {
  // Menggunakan `accountType` sesuai dengan model Prisma
  async createAccount(userId: number, accountType: string, balance: number): Promise<PaymentAccount> {
    return prisma.paymentAccount.create({
      data: {
        userId,
        accountType, // Menggunakan `accountType` sesuai dengan schema Prisma
        balance,
      },
    });
  }

  // Mengambil semua akun berdasarkan user ID
  async getAccountsByUserId(userId: number): Promise<PaymentAccount[]> {
    return prisma.paymentAccount.findMany({
      where: { userId },
    });
  }

  // Mengambil akun berdasarkan ID
  async getAccountById(id: number): Promise<PaymentAccount | null> {
    return prisma.paymentAccount.findUnique({
      where: { id },
    });
  }
}
