import { Prisma, User } from '@prisma/client'
import { PrismaUsersRepository } from '../prisma/prisma-users-repository'

export class InMemoryUsersRepository implements PrismaUsersRepository {
  public item: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.item.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.item.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.item.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
