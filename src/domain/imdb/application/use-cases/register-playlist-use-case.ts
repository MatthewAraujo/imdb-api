import { type Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Playlist } from '../../enterprise/entities/playlist'
import { PlaylistsRepository } from '../repositories/playlists.repository'

interface CreatePlaylistUseCaseRequest {
	name: string
	description?: string | null
	userId: string
}

type CreatePlaylistUseCaseResponse = Either<
	null,
	{
		playlist: Playlist
	}
>

@Injectable()
export class CreatePlaylistUseCase {
	constructor(private playlistsRepository: PlaylistsRepository) {}

	async execute({
		name,
		description,
		userId,
	}: CreatePlaylistUseCaseRequest): Promise<CreatePlaylistUseCaseResponse> {
		const playlist = Playlist.create({
			name,
			description: description || null,
			userId,
		})

		await this.playlistsRepository.create(playlist)

		return right({
			playlist,
		})
	}
}
