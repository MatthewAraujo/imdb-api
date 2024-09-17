import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Playlist, type PlaylistProps } from '@/domain/imdb/enterprise/entities/playlist'
import { PrismaPlaylistMapper } from '@/infra/database/prisma/mappers/prisma-playlist-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makePlaylist(override: Partial<PlaylistProps> = {}, id?: UniqueEntityID) {
	const playlist = Playlist.create(
		{
			name: faker.music.songName(),
			description: faker.lorem.text(),
			userId: faker.string.uuid(),
			...override,
		},
		id,
	)

	return playlist
}

@Injectable()
export class PlaylistFactory {
	constructor(private prisma: PrismaService) {}

	async makePrismaPlaylist(data: Partial<PlaylistProps> = {}): Promise<Playlist> {
		const playlist = makePlaylist(data)

		await this.prisma.playlist.create({
			data: PrismaPlaylistMapper.toPrisma(playlist),
		})

		return playlist
	}
}
