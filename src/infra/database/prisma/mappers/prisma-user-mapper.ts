import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/imdb/enterprise/entities/user'
import type { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
	static toDomain(raw: PrismaUser): User {
		return User.create(
			{
				name: raw.name,
				email: raw.email,
				password: raw.password,
				profileImageUrl: raw.profileImageUrl,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
		return {
			id: user.id.toString(),
			name: user.name,
			email: user.email,
			password: user.password,
			profileImageUrl: user.profileImageUrl,
		}
	}
}
