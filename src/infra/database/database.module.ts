import { PlaylistsRepository } from '@/domain/imdb/application/repositories/playlists.repository'
import { SongsRepository } from '@/domain/imdb/application/repositories/songs-repository'
import { UsersRepository } from '@/domain/imdb/application/repositories/users-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaPlaylistsRepository } from './prisma/repositories/prisma-playlists-repository'
import { PrismaSongsRepository } from './prisma/repositories/prisma-songs-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

@Module({
	providers: [
		PrismaService,
		{
			provide: UsersRepository,
			useClass: PrismaUsersRepository,
		},
		{
			provide: SongsRepository,
			useClass: PrismaSongsRepository,
		},
		{
			provide: PlaylistsRepository,
			useClass: PrismaPlaylistsRepository,
		},
	],
	exports: [PrismaService, UsersRepository, SongsRepository, PlaylistsRepository],
})
export class DatabaseModule { }
