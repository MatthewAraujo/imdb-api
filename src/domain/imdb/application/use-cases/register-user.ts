import { type Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { User } from '../../enterprise/entities/user'
import type { HasherGenerator } from '../cryptography/hasher-generator'
import type { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserUseCaseRequest {
	name: string
	email: string
	password: string
	profileImageUrl: string
}

type RegisterUserUseCaseResponse = Either<
	UserAlreadyExistsError,
	{
		user: User
	}
>

@Injectable()
export class RegisterUserUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private hashGenerator: HasherGenerator,
	) {}

	async execute({
		name,
		email,
		password,
		profileImageUrl,
	}: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if (userWithSameEmail) {
			return left(new UserAlreadyExistsError(email))
		}

		const hashedPassword = await this.hashGenerator.hash(password)

		const user = User.create({
			name,
			email,
			password: hashedPassword,
			profileImageUrl,
		})

		await this.usersRepository.create(user)

		return right({
			user,
		})
	}
}
