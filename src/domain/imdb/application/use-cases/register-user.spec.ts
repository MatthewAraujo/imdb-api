import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-students-repository'
import { RegisterUserUseCase } from './register-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher

let sut: RegisterUserUseCase

describe('Register User', () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository()
		fakeHasher = new FakeHasher()

		sut = new RegisterUserUseCase(inMemoryUsersRepository, fakeHasher)
	})

	it('should be able to register a new user', async () => {
		const result = await sut.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
			profileImageUrl: '',
		})

		expect(result.isRight()).toBe(true)
		expect(result.value).toEqual({
			user: inMemoryUsersRepository.items[0],
		})
	})

	it('should hash user password upon registration', async () => {
		const result = await sut.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
			profileImageUrl: '',
		})

		const hashedPassword = await fakeHasher.hash('123456')

		expect(result.isRight()).toBe(true)
		expect(inMemoryUsersRepository.items[0].password).toEqual(hashedPassword)
	})
})
