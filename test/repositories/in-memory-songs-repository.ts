import { DomainEvents } from '@/core/events/domain-events'
import type { SongsRepository } from '@/domain/imdb/application/repositories/songs-repository'

import type { Song } from '@/domain/imdb/enterprise/entities/song'

export class InMemorySongsRepository implements SongsRepository {
	public items: Song[] = []

	async findById(spotifySongId: string) {
		const song = this.items.find((item) => item.spotifySongId === spotifySongId)

		if (!song) {
			return null
		}

		return song
	}

	async create(song: Song) {
		this.items.push(song)

		DomainEvents.dispatchEventsForAggregate(song.id)
	}
}
