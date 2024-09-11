import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaSongMapper } from '@/infra/database/prisma/mappers/prisma-song-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PlaylistFactory } from 'test/factories/make-playlist'
import { SongFactory } from 'test/factories/make-song'
import { UserFactory } from 'test/factories/make-user'

describe('Create playlist (E2E)', () => {
	let app: INestApplication
	let prisma: PrismaService
	let userFactory: UserFactory
	let jwt: JwtService
	let songFactory: SongFactory
	let playlistFactory: PlaylistFactory

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule, DatabaseModule],
			providers: [UserFactory, SongFactory, PlaylistFactory],
		}).compile()

		app = moduleRef.createNestApplication()

		prisma = moduleRef.get(PrismaService)
		userFactory = moduleRef.get(UserFactory)
		songFactory = moduleRef.get(SongFactory)
		playlistFactory = moduleRef.get(PlaylistFactory)
		jwt = moduleRef.get(JwtService)

		await app.init()
	})

	test('[POST] /playlists', async () => {
		const user = await userFactory.makePrismaUser()


		const accessToken = jwt.sign({ sub: user.id.toString() })

		const playlist = await playlistFactory.makePrismaPlaylist({
			userId: user.id.toString(),
		})

		const playlistOnDatabase = await prisma.playlist.findFirst({
			where: {
				name: playlist.name,
			},
		})

		expect(playlistOnDatabase).toBeTruthy()


		const song = await songFactory.makePrismaSong()

		const songOnDatabase = await prisma.song.findFirst({
			where: {
				id: song.id.toString()
			}
		})


		expect(songOnDatabase).toBeTruthy()

		const response = await request(app.getHttpServer())
			.post(`/playlists/${playlist.id}/tracks`)
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				songId: song.id.toString(),
			})

		expect(response.statusCode).toBe(201)

		const playlistHasASong = await prisma.playlist.findFirst({
			where: {
				id: playlist.id.toString(),
				songs: {
					some: {
						songId: song.id.toString(),
					},
				},
			},
			include: {
				songs: true, // Inclui a relação de músicas na playlist
			},
		});

		expect(playlistHasASong).toBeTruthy();

		const playlistSong = playlistHasASong?.songs.find(
			(s) => s.songId === song.id.toString()
		);

		expect(playlistSong).toBeTruthy();

		const prismaSong = PrismaSongMapper.toPrisma(song);
		expect(playlistSong).toEqual(
			expect.objectContaining({
				songId: prismaSong.id,
			})
		);

	})
})
