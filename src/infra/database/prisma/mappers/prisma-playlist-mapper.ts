import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Playlist } from '@/domain/imdb/enterprise/entities/playlist'
import type { Prisma, Playlist as PrismaPlaylist } from '@prisma/client'

export class PrismaPlaylistMapper {
	static toDomain(raw: PrismaPlaylist): Playlist {
		return Playlist.create(
			{
				name: raw.name,
				description: raw.description || null,
				userId: raw.userId,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrisma(playlist: Playlist): Prisma.PlaylistUncheckedCreateInput {
		return {
			id: playlist.id.toString(),
			name: playlist.name,
			description: playlist.description || null,
			userId: playlist.userId,
		}
	}
}
