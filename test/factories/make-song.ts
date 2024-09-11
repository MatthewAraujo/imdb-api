import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Song, SongProps } from '@/domain/imdb/enterprise/entities/song'
import { PrismaSongMapper } from '@/infra/database/prisma/mappers/prisma-song-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makeSong(override: Partial<SongProps> = {}, id?: UniqueEntityID) {
	const song = Song.create(
		{
			name: faker.music.songName(),
			spotifySongId: faker.string.uuid(), // ID do Spotify
			durationMs: faker.number.int({ min: 100000, max: 5000000 }), // Duração em milissegundos
			previewUrl: faker.internet.url(), // URL de prévia da playlist
			...override,
		},
		id,
	)

	return song
}

@Injectable()
export class SongFactory {
	constructor(private prisma: PrismaService) {}

	async makePrismaSong(data: Partial<SongProps> = {}): Promise<Song> {
		const song = makeSong(data)

		await this.prisma.song.create({
			data: PrismaSongMapper.toPrisma(song),
		})

		return song
	}
}
