import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Song } from '../../enterprise/entities/song'
import { SongsRepository } from '../repositories/songs-repository'
import { SongAlreadyExistsError } from './errors/song-already-exists-error'

interface AddSongToPlaylistUseCaseRequest {
	name: string
	durationMs: number
	previewUrl: string | null
	spotifySongId: string
}

type AddSongToPlaylistUseCaseResponse = Either<
	SongAlreadyExistsError,
	{
		song: Song
	}
>

@Injectable()
export class AddSongToPlaylistUseCase {
	constructor(private songsRepository: SongsRepository) { }

	async execute({
		name,
		durationMs,
		previewUrl,
		spotifySongId,
	}: AddSongToPlaylistUseCaseRequest): Promise<AddSongToPlaylistUseCaseResponse> {
		const songWithSameEmail = await this.songsRepository.findById(spotifySongId)

		if (songWithSameEmail) {
			return left(new SongAlreadyExistsError(name))
		}

		const song = Song.create({
			name,
			durationMs,
			previewUrl,
			spotifySongId,
		})

		await this.songsRepository.create(song)

		return right({
			song,
		})
	}
}
