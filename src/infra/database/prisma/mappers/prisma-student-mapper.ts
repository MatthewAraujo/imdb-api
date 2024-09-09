import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Student } from '@/domain/finder/enterprise/entities/student'
import type { Prisma, User as PrismaUser } from '@prisma/client'

export class PrismaStudentMapper {
	static toDomain(raw: PrismaUser): Student {
		return Student.create(
			{
				name: raw.name,
				email: raw.email,
				password: raw.passwordHash,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
		return {
			id: student.id.toString(),
			name: student.name,
			email: student.email,
			passwordHash: student.password,
		}
	}
}
