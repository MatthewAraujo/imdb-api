import { SongsRepository } from '@/domain/imdb/application/spotify/repositories/songs-repository'
import { Song } from '@/domain/imdb/enterprise/entities/song'
import { Injectable } from '@nestjs/common'
import { SpotifySongMapper } from '../mappers/spotify-song-mapper'
import { SpotifyService } from '../spotify.service'

@Injectable()
export class SpotifySongsRepository implements SongsRepository {
	constructor(private spotify: SpotifyService) {}

	async findById(id: string): Promise<Song | null> {
		try {
			const spotifyTrack = await this.spotify.getTrackById(id)

			if (!spotifyTrack) {
				return null
			}

			const song = SpotifySongMapper.toDomain(spotifyTrack)

			return song
		} catch (error) {
			console.error('Erro ao buscar música no Spotify:', error)
			return null
		}
	}
}
