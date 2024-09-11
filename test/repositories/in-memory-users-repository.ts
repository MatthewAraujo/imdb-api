import { DomainEvents } from '@/core/events/domain-events'
import type { UsersRepository } from '@/domain/imdb/application/repositories/users-repository'
import type { User } from '@/domain/imdb/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = []

	async findByEmail(email: string) {
		const user = this.items.find((item) => item.email === email)

		if (!user) {
			return null
		}

		return user
	}

	async create(user: User) {
		this.items.push(user)

		DomainEvents.dispatchEventsForAggregate(user.id)
	}
}
