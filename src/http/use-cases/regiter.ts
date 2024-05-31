import { hash } from 'bcryptjs'
import { UserRepository } from '@/repositories/users-repository'

interface registerUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({ name, email, password }: registerUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('User with same email already exists.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
