import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, type UserProps } from '@/domain/imdb/enterprise/entities/user'
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeUser(override: Partial<UserProps> = {}, id?: UniqueEntityID) {
	const user = User.create(
		{
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			profileImageUrl: faker.image.url(),
			...override,
		},
		id,
	)

	return user
}

@Injectable()
export class UserFactory {
	constructor(private prisma: PrismaService) {}

	async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
		const user = makeUser(data)

		await this.prisma.user.create({
			data: PrismaUserMapper.toPrisma(user),
		})

		return user
	}
}
