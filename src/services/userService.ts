import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

export class UserService {
  async createUser(username: string, password: string): Promise<User> {
    return prisma.user.create({
      data: {
        username,
        password,
      },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}
