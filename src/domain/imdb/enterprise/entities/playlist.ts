import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Song } from './song'

export interface PlaylistProps {
	name: string
	description?: string | null
	userId: string
	songs?: Song[]
}

export class Playlist extends Entity<PlaylistProps> {
	get name() {
		return this.props.name
	}

	get description() {
		return this.props.description
	}

	get userId() {
		return this.props.userId
	}

	get songs() {
		return this.props.songs || []
	}

	static create(props: PlaylistProps, id?: UniqueEntityID) {
		const playlist = new Playlist(
			{
				...props,
				songs: props.songs ?? [], // Inicializa como uma lista vazia se não for passada
			},
			id,
		)

		return playlist
	}
}
