import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface SongProps {
	name: string
	spotifySongId: string
	durationMs: number
	previewUrl: string | null
}

export class Song extends Entity<SongProps> {
	get name() {
		return this.props.name
	}

	get durationMs() {
		return this.props.durationMs
	}

	get previewUrl() {
		return this.props.previewUrl
	}

	get spotifySongId() {
		return this.props.spotifySongId
	}

	static create(props: SongProps, id?: UniqueEntityID) {
		const song = new Song(props, id)

		return song
	}
}
