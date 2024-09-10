import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import type { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

describe('Create playlist (E2E)', () => {
	let app: INestApplication
	let prisma: PrismaService
	let userFactory: UserFactory
	let jwt: JwtService

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule, DatabaseModule],
			providers: [UserFactory],
		}).compile()

		app = moduleRef.createNestApplication()

		prisma = moduleRef.get(PrismaService)
		userFactory = moduleRef.get(UserFactory)
		jwt = moduleRef.get(JwtService)

		await app.init()
	})

	test('[POST] /playlists', async () => {
		const user = await userFactory.makePrismaUser()

		const accessToken = jwt.sign({ sub: user.id.toString() })

		const response = await request(app.getHttpServer())
			.post('/playlists')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				name: 'New playlist',
				description: 'Playlist content',
			})

		expect(response.statusCode).toBe(201)

		const playlistOnDatabase = await prisma.playlist.findFirst({
			where: {
				name: 'New playlist',
			},
		})

		expect(playlistOnDatabase).toBeTruthy()
	})
})
