import { Either, left, right } from '@/core/either'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Song } from '../../enterprise/entities/song'
import { PlaylistsRepository } from '../repositories/playlists.repository'
import { SongsRepository } from '../repositories/songs-repository'
import { SongsRepository as SpotifySongsRepository } from '../spotify/repositories/songs-repository'
import { SongAlreadyIsOnPlaylist } from './errors/song-already-is-on-playlist-error'
import { UserDoesntOwnThatPlaylistError } from './errors/user-doesnt-own-that-playlist-error'
import { PlaylistSong } from '../../enterprise/entities/playlistSong'

interface AddSongToPlaylistUseCaseRequest {
	playlistId: string
	songId: string
	userId: string
}

type AddSongToPlaylistUseCaseResponse = Either<
	SongAlreadyIsOnPlaylist | UserDoesntOwnThatPlaylistError,
	{
		song: Song
	}
>

@Injectable()
export class AddSongToPlaylistUseCase {
	constructor(
		private songsRepository: SongsRepository,
		private playlistRepository: PlaylistsRepository,
		private spotifySongsRepository: SpotifySongsRepository,
	) { }

	async execute({
		playlistId,
		songId,
		userId,
	}: AddSongToPlaylistUseCaseRequest): Promise<AddSongToPlaylistUseCaseResponse> {
		const userHasPlaylist = await this.playlistRepository.findOwner(userId, playlistId)

		if (!userHasPlaylist) {
			return left(new UserDoesntOwnThatPlaylistError())
		}

		const songAlreadyIsOnPlaylist = await this.playlistRepository.findById(songId)

		if (songAlreadyIsOnPlaylist) {
			return left(new SongAlreadyIsOnPlaylist(songAlreadyIsOnPlaylist.name))
		}

		const spotifySongs = await this.spotifySongsRepository.findById(songId)

		if (!spotifySongs) {
			return left(new BadRequestException())
		}

		const song = Song.create({
			durationMs: spotifySongs.durationMs,
			name: spotifySongs.name,
			previewUrl: spotifySongs.previewUrl,
			spotifySongId: spotifySongs.id.toString(),
		})

		await this.songsRepository.create(song)

		const playlistSong = PlaylistSong.create({
			playlistId,
			songId
		})
		await this.playlistRepository.addSong(playlistSong)

		return right({
			song,
		})
	}
}
