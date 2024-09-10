import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Song } from '@/domain/imdb/enterprise/entities/song'
import type { Prisma, Song as PrismaSong } from '@prisma/client'

export class PrismaSongMapper {
	static toDomain(raw: PrismaSong): Song {
		return Song.create(
			{
				name: raw.name,
				durationMs: raw.durationMs,
				previewUrl: raw.previewUrl,
				spotifySongId: raw.spotifySongId,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toPrisma(song: Song): Prisma.SongUncheckedCreateInput {
		return {
			id: song.id.toString(),
			name: song.name,
			durationMs: song.durationMs,
			spotifySongId: song.spotifySongId,
			previewUrl: song.previewUrl,
		}
	}
}
