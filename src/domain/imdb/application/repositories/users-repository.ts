import type { User } from '../../enterprise/entities/user'

export abstract class UsersRepository {
	abstract findByEmail(id: string): Promise<User | null>
	abstract create(question: User): Promise<void>
}
