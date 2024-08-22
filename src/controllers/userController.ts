import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../services/userService';

export class UserController {
  private userService = new UserService();

  async registerUser(request: FastifyRequest, reply: FastifyReply) {
    const { username, password } = request.body as { username: string; password: string };
    
    try {
      const user = await this.userService.createUser(username, password);
      reply.code(201).send(user);
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  async getUser(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    
    try {
      const user = await this.userService.getUserById(parseInt(id));
      if (!user) {
        reply.code(404).send({ error: 'User not found' });
      } else {
        reply.send(user);
      }
    } catch (error) {
      console.error('Error fetching user:', error); // Tambahkan logging di sini
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }
}
