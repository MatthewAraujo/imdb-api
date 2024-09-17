import { Module } from '@nestjs/common'
import { SpotifyService, } from './spotify/spotify.service'
import { SongsRepository } from '@/domain/imdb/application/spotify/repositories/songs-repository'
import { SpotifySongsRepository } from './spotify/repository/spotify-songs-repository'

@Module({
	providers: [
		SpotifyService,
		{
			provide: SongsRepository,
			useClass: SpotifySongsRepository,
		},
	],
	exports: [SpotifyService, SongsRepository],
})
export class APIModule { }
