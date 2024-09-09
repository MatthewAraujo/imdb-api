import { type Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import type { Encrypter } from '../cryptography/encrypter'
import type { HasherCompare } from '../cryptography/hasher-comparer'
import type { StudentsRepository } from '../repositories/students-repository'
import { WrongCredentialsError } from './errors/wrong-credentials.error'

interface AuthenticateStudentUseCaseRequest {
	email: string
	password: string
}

type AuthenticateStudentUseCaseResponse = Either<
	WrongCredentialsError,
	{
		accessToken: string
	}
>

@Injectable()
export class AuthenticateStudentUseCase {
	constructor(
		private studentsRepository: StudentsRepository,
		private hashComparer: HasherCompare,
		private encrypter: Encrypter,
	) {}

	async execute({
		email,
		password,
	}: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
		const student = await this.studentsRepository.findByEmail(email)

		if (!student) {
			return left(new WrongCredentialsError())
		}

		const isPasswordValid = await this.hashComparer.compare(password, student.password)

		if (!isPasswordValid) {
			return left(new WrongCredentialsError())
		}

		const accessToken = await this.encrypter.encrypt({
			sub: student.id.toString(),
		})

		return right({
			accessToken,
		})
	}
}
