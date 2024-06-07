import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFountError } from './errors/resource-not-fount-error'

interface GetUseProfileUseCaseRequest {
  userId: string
}

interface GetUseProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUseProfileUseCaseRequest): Promise<GetUseProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFountError()
    }

    return {
      user,
    }
  }
}
