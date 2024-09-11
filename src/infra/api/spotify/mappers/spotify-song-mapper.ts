import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Song } from '@/domain/imdb/enterprise/entities/song'

interface SpotifyTrackPayload {
	name: string
	duration_ms: number
	preview_url: string | null
	id: string
}

export class SpotifySongMapper {
	static toDomain(raw: SpotifyTrackPayload): Song {
		return Song.create(
			{
				name: raw.name,
				durationMs: raw.duration_ms,
				previewUrl: raw.preview_url,
				spotifySongId: raw.id,
			},
			new UniqueEntityID(raw.id),
		)
	}

	static toSpotify(song: Song): SpotifyTrackPayload {
		return {
			name: song.name,
			duration_ms: song.durationMs,
			preview_url: song.previewUrl,
			id: song.spotifySongId,
		}
	}
}
