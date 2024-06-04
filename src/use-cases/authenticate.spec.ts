import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUserCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUserCase.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrogn email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUserCase = new AuthenticateUseCase(usersRepository)

    await expect(() =>
      authenticateUserCase.execute({
        email: 'johndoes@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrogn password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const authenticateUserCase = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUserCase.execute({
        email: 'johndoes@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
